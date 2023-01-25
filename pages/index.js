import dynamic from "next/dynamic";

const ActionPage = dynamic(() => import("../components/ActionHome"), {
	ssr: false,
});

export default function Index() {
	return (
		<main>
			<ActionPage />
		</main>
	);
}
