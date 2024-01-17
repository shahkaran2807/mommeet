export default function Page({ params }: { params: { search_term: string } }) {
    return (
        <div>{params.search_term}</div>
    )
}