import dynamic from "next/dynamic";

const SettingsPage = dynamic(() => import("../components/Settings"), {
	ssr: false,
});

export default function Report() {
	return (
		<main>
			<SettingsPage />
		</main>
	);
}
