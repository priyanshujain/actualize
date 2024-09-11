import dynamic from "next/dynamic";

const Support = dynamic(() => import("../components/Support"), {
	ssr: false,
});

export default function Report() {
	return (
		<main>
			<Support />
		</main>
	);
}
