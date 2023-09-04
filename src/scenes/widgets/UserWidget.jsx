import {
    ManageAccountsOutlined,
    EditOutlined,
    SchoolOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
  } from "@mui/icons-material";
  import { Box, Typography, Divider, useTheme } from "@mui/material";
  import UserImage from "../../components/UserImage";
  import FlexBetween from "../../components/FlexBetween";
  import WidgetWrapper from "../../components/WidgetWrapper";
  import { useSelector } from "react-redux";
  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  
  const UserWidget = ({ userId }) => {
    const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
  
    const getUser = async () => {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUser(data);
    };
    
  
    useEffect(() => {
      getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    console.log(user)
    if (!user) {
      return null;
    }
  
    const {
      firstName,
      lastName,
      college,
      branch,
      picturePath,
      viewedProfile,
      impressions,
      friends,
    } = user;
  
    return (
      <WidgetWrapper
      sx={{
        width: 300,
        height: 300,
        }}
      >
        {/* FIRST ROW */}
        <FlexBetween
          gap="0.5rem"
          pb="1.1rem"
          onClick={() => navigate(`/profile/${userId}`)}
        >
          <FlexBetween gap="1rem">
            <UserImage image={picturePath} />
            <Box>
              <Typography
                variant="h4"
                color={dark}
                fontWeight="500"
                sx={{
                  "&:hover": {
                    color: palette.primary.light,
                    cursor: "pointer",
                  },
                }}
              >
                {firstName} {lastName}
              </Typography>
              <Typography color={medium}>{friends ? friends.length : 0}</Typography>
            </Box>
          </FlexBetween>
          <ManageAccountsOutlined />
          </FlexBetween>

  
        <Divider />
  
        {/* SECOND ROW */}
        <Box p="1rem 0">
          <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
            <LocationOnOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{college}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap="1rem">
            <SchoolOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{branch}</Typography>
          </Box>
        </Box>
  
        <Divider />
  
        {/* THIRD ROW */}
        <Box p="1rem 0">
          <FlexBetween mb="0.5rem">
            <Typography color={medium}>Who's viewed your profile</Typography>
            <Typography color={main} fontWeight="500">
              {viewedProfile}
            </Typography>
          </FlexBetween>
          <FlexBetween>
            <Typography color={medium}>Impressions of your post</Typography>
            <Typography color={main} fontWeight="500">
              {impressions}
            </Typography>
          </FlexBetween>
        </Box>
  
        <Divider />
  
        {/* FOURTH ROW */}
        <Box p="1rem 0">
          <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
            Social Profiles
          </Typography>
  
          <FlexBetween gap="1rem" mb="0.5rem">
            <FlexBetween gap="1rem">
              <img src="https://freelogopng.com/images/all_img/1690643591twitter-x-logo-png.png" 
              alt="twitter" 
              width="10%"
              height="auto"
              />
              <Box>
                <Typography color={main} fontWeight="500">
                  Twitter
                </Typography>
                <Typography color={medium}>Social Network</Typography>
              </Box>
            </FlexBetween>
            <EditOutlined sx={{ color: main }} />
          </FlexBetween>
  
          <FlexBetween gap="1rem">
            <FlexBetween gap="1rem">
              <img src="data:image/png;base64,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"
               alt="linkedin"
               width="10%"
               height="auto" />
              <Box>
                <Typography color={main} fontWeight="500">
                  Linkedin
                </Typography>
                <Typography color={medium}>Network Platform</Typography>
              </Box>
            </FlexBetween>
            <EditOutlined sx={{ color: main }} />
          </FlexBetween>
        </Box>
      </WidgetWrapper>
    );
  };
  
  export default UserWidget;