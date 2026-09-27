
const Background = ({ children }) => {
    const layers = [
        {
          className: "aura-layer-1",
          background:
            "radial-gradient(circle at 20% 30%, rgba(21, 173, 203, 0.5) 0%, transparent 50%)",
        },
        {
          className: "aura-layer-2",
          background:
            "radial-gradient(circle at 75% 25%, rgba(61, 171, 240, 0.4) 0%, transparent 45%)",
        },
        {
          className: "aura-layer-3",
          background:
            "radial-gradient(circle at 73% 82%, rgba(250, 204, 21, 0.35) 0%, transparent 55%)",
        },
        {
          className: "aura-layer-4",
          background:
            "radial-gradient(circle at 25% 62%, rgba(167, 139, 250, 0.25) 0%, transparent 40%)",
        },
      ];
      
  return (
    <div className="aura-bg px-8">
      <div className="aura-layers" aria-hidden="true">
        {layers.map((layer) => (
          <div
            key={layer.className}
            className={layer.className}
            style={{ background: layer.background }}
          />
        ))}
      </div>
      <div className="aura-content">{children}</div>
    </div>
  );
};

export default Background;
