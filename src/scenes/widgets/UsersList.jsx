import { Box, Typography, useTheme } from "@mui/material";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../../state";

const UsersList = () => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const users = useSelector((state) => state.users);

  const getUsers = async () => {
    const response = await fetch(
      `http://localhost:3001/users`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ users: data }));
  };

  useEffect(() => {
    getUsers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Connection List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {users.map((user) => (
          <Friend
            key={user._id}
            friendId={user._id}
            name={`${user.firstName} ${user.lastName}`}
            subtitle={user.occupation}
            userPicturePath={user.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default UsersList;