/**
 * Renders a JSON-LD structured data block. `data` should be a plain object
 * built from trusted/sanitized fields (TMDB response fields, never raw
 * user input) — it is serialized as-is into the page.
 */
const JsonLd = ({ data }: { data: Record<string, unknown> }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export default JsonLd;
