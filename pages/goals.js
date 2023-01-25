import dynamic from "next/dynamic";

const TodoSchema = dynamic(() => import("../components/Todo"), {
	ssr: false,
});

export default function Schema() {
	return (
		<main>
			<TodoSchema />
		</main>
	);
}
