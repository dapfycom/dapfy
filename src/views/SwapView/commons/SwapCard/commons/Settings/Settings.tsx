import { Box, Spinner } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import { SettingsIcon } from "components/icons/ui-icons";
import React, { lazy, useState } from "react";

const SettingsModal = lazy(() => import("../SettingsModal"));

const Settings = () => {
  const [openSettings, setOpenSettings] = useState(false);

  const handleOpenSettings = () => {
    setOpenSettings(true);
  };
  const handleCloseSettings = () => {
    setOpenSettings(false);
  };

  return (
    <Box position={"relative"}>
      <ActionButton bg="transparent" onClick={handleOpenSettings}>
        <SettingsIcon fontSize={{ xs: "23px", lg: "32px" }} />
      </ActionButton>
      {openSettings && (
        <Box position={"absolute"} right={0} zIndex={2} top={"52px"}>
          <React.Suspense fallback={<Spinner />}>
            <SettingsModal onClose={handleCloseSettings} />
          </React.Suspense>
        </Box>
      )}
    </Box>
  );
};

export default Settings;
