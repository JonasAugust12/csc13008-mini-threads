const path = require("path");

const profileController = (req, res) => {
  // data giả, thay đoạn này bằng dữ liệu từ database
  const user = {
    avatar:
      "https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png",
    name: "Minh Toàn",
    nickname: "cas.nothingtosay",
    bio: "Vietnamese gang",
  };
  const followerUsers = [
    {
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      username: "user1",
      name: "User 1",
      followers: Math.floor(Math.random() * 10000),
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      username: "user2",
      name: "User 2",
      followers: Math.floor(Math.random() * 10000),
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      username: "user3",
      name: "User 3",
      followers: Math.floor(Math.random() * 10000),
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
      username: "user4",
      name: "User 4",
      followers: Math.floor(Math.random() * 10000),
    },
  ];

  res.render("layout", {
    title: "Mini Threads",
    body: "profile",
    header: "Profile",
    refreshItems: [
      { name: "For you", link: "/home/for-you" },
      { name: "Following", link: "/home/following" },
      { name: "Liked", link: "/home/liked" },
      { name: "Saved", link: "/home/saved" },
    ],
    selectedItem: "For you",
    username: req.session.username,
    avatarSrc:
      "https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png",
    followerUsers: followerUsers,
    user: user,
  });
};

module.exports = profileController;
