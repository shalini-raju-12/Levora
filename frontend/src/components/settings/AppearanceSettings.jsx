import { useState, useEffect } from "react";
import { toast } from "react-toastify";

function AppearanceSettings() {
  const [appearance, setAppearance] = useState({
    theme: localStorage.getItem("levora-theme") || "light",
    accentColor: localStorage.getItem("levora-accent") || "blue",
    fontSize: localStorage.getItem("levora-font") || "medium",
  });

  useEffect(() => {
    document.body.setAttribute("data-theme", appearance.theme);
    document.body.setAttribute("data-accent", appearance.accentColor);
    document.body.setAttribute("data-font", appearance.fontSize);
  }, []);

  const handleThemeChange = (theme) => {
    setAppearance((prev) => ({
      ...prev,
      theme,
    }));
  };

  const handleAccentColorChange = (color) => {
    setAppearance((prev) => ({
      ...prev,
      accentColor: color,
    }));
  };

  const handleFontSizeChange = (size) => {
    setAppearance((prev) => ({
      ...prev,
      fontSize: size,
    }));
  };

  const handleApplyTheme = () => {
    document.body.setAttribute("data-theme", appearance.theme);
    document.body.setAttribute("data-accent", appearance.accentColor);
    document.body.setAttribute("data-font", appearance.fontSize);

    localStorage.setItem("levora-theme", appearance.theme);
    localStorage.setItem("levora-accent", appearance.accentColor);
    localStorage.setItem("levora-font", appearance.fontSize);

    toast.success("Theme applied successfully.");
  };

  return (
    <div className="settings-card">
      <div className="settings-card-header">
        <h2 className="settings-card-title">Appearance</h2>

        <p className="settings-card-description">
          Customize your theme and display preferences
        </p>
      </div>

      <div className="settings-card-body">

        <div className="appearance-section">
          <h3 className="appearance-section-title">Theme</h3>

          <div className="theme-options">

            <label className="radio-option">
              <input
                type="radio"
                checked={appearance.theme === "light"}
                onChange={() => handleThemeChange("light")}
              />
              <span className="radio-label">Light</span>
            </label>

            <label className="radio-option">
              <input
                type="radio"
                checked={appearance.theme === "dark"}
                onChange={() => handleThemeChange("dark")}
              />
              <span className="radio-label">Dark</span>
            </label>

            <label className="radio-option">
              <input
                type="radio"
                checked={appearance.theme === "system"}
                onChange={() => handleThemeChange("system")}
              />
              <span className="radio-label">System</span>
            </label>

          </div>
        </div>

        <div className="appearance-section">
          <h3 className="appearance-section-title">Accent Color</h3>

          <div className="color-options">

            {[
              ["blue", "#3b82f6"],
              ["yellow", "#F4C542"],
              ["green", "#10b981"],
              ["purple", "#8b5cf6"],
            ].map(([name, color]) => (
              <label className="color-option" key={name}>
                <input
                  type="radio"
                  checked={appearance.accentColor === name}
                  onChange={() => handleAccentColorChange(name)}
                />

                <span
                  className="color-preview"
                  style={{ background: color }}
                ></span>

                <span className="color-label">{name}</span>

              </label>
            ))}

          </div>
        </div>

        <div className="appearance-section">
          <h3 className="appearance-section-title">Font Size</h3>

          <div className="font-size-options">

            {["small", "medium", "large"].map((size) => (
              <label className="radio-option" key={size}>
                <input
                  type="radio"
                  checked={appearance.fontSize === size}
                  onChange={() => handleFontSizeChange(size)}
                />

                <span className="radio-label">
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </span>

              </label>
            ))}

          </div>
        </div>

        <div className="form-actions">
          <button
            className="btn-primary"
            onClick={handleApplyTheme}
          >
            Apply Theme
          </button>
        </div>

      </div>
    </div>
  );
}

export default AppearanceSettings;