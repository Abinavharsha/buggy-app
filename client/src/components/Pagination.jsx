export default function Pagination({ page, onChange }) {
  return (
    <div>
      <button
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
      >
        Previous
      </button>

      <span style={{ margin: "0 8px" }}>
        Page {page}
      </span>

      <button onClick={() => onChange(page + 1)}>
        Next
      </button>
    </div>
  );
}
