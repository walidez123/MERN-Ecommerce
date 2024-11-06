import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSettings, updateSettings } from "../../../redux/slices/settings.js"; // Adjust the import as necessary
import { toast } from "react-hot-toast";
import StandardButton from "../../../components/buttons/standerdButton"; // Adjust the path as necessary
import MotionComponent from "../../../components/motion.jsx";

const WebsiteSettings = () => {
  const dispatch = useDispatch();
  const { settings, loading, error } = useSelector((state) => state.settings);

  const [siteTitle, setSiteTitle] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  useEffect(() => {
    if (settings) {
      setSiteTitle(settings.siteTitle);
      setContactEmail(settings.contactEmail);
      setFacebook(settings.socialLinks?.facebook || "");
      setTwitter(settings.socialLinks?.twitter || "");
      setInstagram(settings.socialLinks?.instagram || "");
      setLogoUrl(settings.logoUrl);
      setMetaDescription(settings.metaDescription);
      setMetaKeywords(settings.metaKeywords?.join(", ") || "");
    }
  }, [settings]);

  const handleUpdateSettings = async (e) => {
    e.preventDefault();
    const updatedSettings = {
      siteTitle,
      contactEmail,
      socialLinks: { facebook, twitter, instagram },
      logoUrl,
      metaDescription,
      metaKeywords: metaKeywords.split(",").map((keyword) => keyword.trim()),
    };
    const response = await dispatch(updateSettings(updatedSettings));
    
    // Check if the update is successful
    if (response.meta.requestStatus === "fulfilled") {
      toast.success("Settings updated successfully!");
      window.location.reload(); // Refresh the page to reflect the updated settings
    } else {
      // Extract the error message from the response payload
      const errorMessage = response.payload?.msg || "Failed to update settings.";
      toast.error(errorMessage);
    }
  };

  return (
    <MotionComponent>

    <div className="w-screen min-h-screen flex flex-col">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="border min-w-[480px] mx-auto p-24 rounded-md shadow-xl">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <form className="flex flex-col gap-4" onSubmit={handleUpdateSettings}>
              <input
                type="text"
                value={siteTitle}
                onChange={(e) => setSiteTitle(e.target.value)}
                placeholder="Site Title"
                required
                className="p-3 bg-white rounded-md text-black"
              />
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="Contact Email"
                required
                className="p-3 bg-white rounded-md text-black"
              />
              <input
                type="text"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                placeholder="Facebook URL"
                className="p-3 bg-white rounded-md text-black"
              />
              <input
                type="text"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                placeholder="Twitter URL"
                className="p-3 bg-white rounded-md text-black"
              />
              <input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="Instagram URL"
                className="p-3 bg-white rounded-md text-black"
              />
              <input
                type="text"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                placeholder="Logo URL"
                className="p-3 bg-white rounded-md text-black"
              />
              <textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Meta Description"
                className="p-3 bg-white rounded-md text-black"
              />
              <input
                type="text"
                value={metaKeywords}
                onChange={(e) => setMetaKeywords(e.target.value)}
                placeholder="Meta Keywords (comma-separated)"
                className="p-3 bg-white rounded-md text-black"
              />
              <StandardButton type="submit">
                <button className="text-xl w-full">Update Settings</button>
              </StandardButton>
            </form>
          )}
        </div>
      </div>
    </div>
    </MotionComponent>

  );
};

export default WebsiteSettings;
