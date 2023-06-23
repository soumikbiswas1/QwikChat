import React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Stack, Typography } from "@mui/material";

import { Link, useSearchParams } from "react-router-dom";
import ChatComponent from "./Conversation";
import Chats from "./Chats";
import Contact from "../../sections/Dashboard/Contact";
import NoChat from "../../assets/Illustration/NoChat";
import { useSelector } from "react-redux";
import StarredMessages from "../../sections/Dashboard/StarredMessages";
import Media from "../../sections/Dashboard/SharedMessages";

const GeneralApp = () => {
  const [searchParams] = useSearchParams();

  const theme = useTheme();

  const app = useSelector((store) => store.app);
  const { sidebar,room_id, chat_type } = useSelector((store) => store.app);
 
  return (
    <>
      <Stack direction="row" sx={{ width: "100%" }}>
        <Chats />
        <Box
          sx={{
            height: "100%",
            width: sidebar.open
              ? `calc(100vw - 740px )`
              : "calc(100vw - 420px )",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#FFF"
                : theme.palette.background.paper,
            borderBottom:
              searchParams.get("type") === "individual-chat" &&
              searchParams.get("id")
                ? "0px"
                : "6px solid #0162C4",
          }}
        >
          {chat_type === "individual" &&
          room_id !== null ? (
            <ChatComponent />
          ) : (
            <Stack
              spacing={2}
              sx={{ height: "100%", width: "100%" }}
              alignItems="center"
              justifyContent={"center"}
            >
              <NoChat />
              <Typography variant="subtitle2">
                Select a conversation or start a{" "}
                <Link
                  style={{
                    color: theme.palette.primary.main,
                    textDecoration: "none",
                  }}
                  to="/"
                >
                  new one
                </Link>
              </Typography>
            </Stack>
          )}
        </Box>
        {sidebar.open &&
          (() => {
            switch (sidebar.type) {
              case "CONTACT":
                return <Contact />;

              case "STARRED":
                return <StarredMessages />;

              case "SHARED":
                return <Media />;

              default:
                break;
            }
          })()}
      </Stack>
    </>
  );
};

export default GeneralApp;
