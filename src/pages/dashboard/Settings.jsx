import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import Card from "../../components/Card";

export default function Settings() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [settings, setSettings] = useLocalStorage("settings", {
    notifications: true,
    language: "en",
    newsletter: false,
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setSettings({ ...settings, [name]: type === "checkbox" ? checked : value });
  };

  return (
    <Card className="max-w-lg space-y-4">
      <h1 className="text-2xl font-bold">Settings</h1>

      <label className="flex items-center gap-2">
        <input type="checkbox" checked={theme === "dark"} onChange={toggleTheme} />
        Dark Mode
      </label>

      <label className="flex items-center gap-2">
        <input type="checkbox" name="notifications" checked={settings.notifications} onChange={handleChange} />
        Enable notifications
      </label>

      <label className="block">
        Language
        <select name="language" value={settings.language} onChange={handleChange} className="border p-2 rounded w-full mt-1 bg-white dark:bg-gray-700">
          <option value="en">English</option>
          <option value="ur">Urdu</option>
          <option value="ar">Arabic</option>
        </select>
      </label>

      <label className="flex items-center gap-2">
        <input type="checkbox" name="newsletter" checked={settings.newsletter} onChange={handleChange} />
        Receive newsletter (account preference)
      </label>
    </Card>
  );
}