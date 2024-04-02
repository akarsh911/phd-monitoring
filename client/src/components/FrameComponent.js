import "./FrameComponent.css";

const FrameComponent = () => {
  return (
    <div className="rectangle-group">
      <div className="frame-item" />
      <div className="frame-wrapper1">
        <div className="frame-parent2">
          <div className="welcome-to-wrapper">
            <h1 className="welcome-to">Welcome To</h1>
          </div>
          <h1 className="thapar-university">
            <p className="thapar">THAPAR</p>
            <p className="university">UNIVERSITY</p>
          </h1>
        </div>
      </div>
      <h2 className="lorem-ipsum-dolor">{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex `}</h2>
    </div>
  );
};

export default FrameComponent;
