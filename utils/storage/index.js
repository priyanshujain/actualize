import React from "react";

/*
function GetData() {
    const [data, setData] = useState({});
    const retrieved = useRef(false); //To get around strict mode running the hook twice
    useEffect(() => {
        if (retrieved.current) return;
        retrieved.current = true;
        setData(getDataLocalStorage());
    }, []);

    return data || {};
}

function SetData(updatedData) {
    const [data, setData] = useState({});
    const retrieved = useRef(false); //To get around strict mode running the hook twice
    useEffect(() => {
        if (retrieved.current) return;
        retrieved.current = true;
        setData(setDataLocalStorage(updatedData));
    }, []);

    return data;
}
*/

function getData() {
	return getDataLocalStorage();
}

function setData(updatedData) {
	return setDataLocalStorage(updatedData);
}

function getLatestDate() {
	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	if (month < 10) {
		return `${year}-0${month}-${day}`;
	}
	return `${year}-${month}-${day}`;
}

function getDataLocalStorage() {
	var data = window.localStorage.getItem("db");
	if (data) {
		data = decodeURIComponent(escape(window.atob(data)));
		data = JSON.parse(data);
	} else {
		data = {};
		data["events"] = {};
	}
	return data;
}

function setDataLocalStorage(data) {
	data = window.btoa(unescape(encodeURIComponent(JSON.stringify(data))));
	window.localStorage.setItem("db", data);
}
function getSchema() {
	const data = getData();
	var schema = data["schema"] || {
		lastUpdated: new Date().toISOString(),
		lastUpdatedDisplay: new Date().toLocaleString(),
		tasks: [],
	};
	return schema["tasks"] || [];
}

function setSchema(tasks) {
	const db = getData();
	var schema = {
		tasks: tasks,
	};
	schema["lastUpdated"] = new Date().toISOString();
	schema["lastUpdatedDisplay"] = new Date().toLocaleString();
	db["schema"] = schema;
	setData(db);
}

function getLatestData() {
	var data = getData();
	const date = getLatestDate();
	const defaultData = getSchema().map((key) => {
		return {
			id: key.id,
			text: key.text,
			completed: false,
			lastUpdated: "",
			lastUpdatedDisplay: "",
		};
	});
	if (!data["events"][date]) {
		data["events"][date] = {};
		data["events"][date]["tasks"] = defaultData;
		data["events"][date]["lastUpdated"] = new Date().toISOString();
		data["events"][date]["lastUpdatedDisplay"] =
			new Date().toLocaleString();
		setData(data);
		return data["events"][date];
	}
	// check if any item in data has changed from schema
	const schema = getSchema();
	const schemaIds = schema.map((key) => key.id);
	const dataIds = data["events"][date]["tasks"].map((key) => key.id);
	const newIds = schemaIds.filter((id) => !dataIds.includes(id));
	const removedIds = dataIds.filter((id) => !schemaIds.includes(id));
	if (newIds.length > 0 || removedIds.length > 0) {
		const newData = data["events"][date]["tasks"].filter(
			(item) => !removedIds.includes(item.id)
		);
		newIds.forEach((id) => {
			newData.push({
				id: id,
				text: schema.find((item) => item.id === id).text,
				completed: false,
				lastUpdated: "",
				lastUpdatedDisplay: "",
			});
		});
		data["events"][date]["tasks"] = newData;
		data["events"][date]["lastUpdated"] = new Date().toISOString();
		data["events"][date]["lastUpdatedDisplay"] =
			new Date().toLocaleString();
		setData(data);
	}
	return data["events"][date];
}

function setLatestData(data) {
	var db = getData();
	const date = getLatestDate();
	data["lastUpdated"] = new Date().toISOString();
	data["lastUpdatedDisplay"] = new Date().toLocaleString();
	if (!db["events"][date]) {
		db["events"][date] = {};
	}
	db["events"][date]["tasks"] = data;
	db["events"][date]["lastUpdated"] = new Date().toISOString();
	db["events"][date]["lastUpdatedDisplay"] = new Date().toLocaleString();
	setData(db);
}

function downloadData() {
	const data = JSON.stringify(getData(), null, 4);
	const filename = "leben-backup.json";
	var file = new Blob([data], { type: "application/json" });
	if (window.navigator.msSaveOrOpenBlob)
		// IE10+
		window.navigator.msSaveOrOpenBlob(file, filename);
	else {
		// Others
		var a = document.createElement("a"),
			url = URL.createObjectURL(file);
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		setTimeout(function () {
			document.body.removeChild(a);
			window.URL.revokeObjectURL(url);
		}, 0);
	}
}

export {
	getLatestDate,
	getSchema,
	setSchema,
	getLatestData,
	setLatestData,
	downloadData,
	getData,
};
