const path = require('path');
const User = require('../Models/User'); // model user
const Follow = require('../Models/Follow'); // model follow
const jwt = require('jsonwebtoken'); // token
const { default: mongoose } = require('mongoose');
const env = require('dotenv').config(); // biến môi trường
const Post1 = require('../Models/Post1');
const Notification = require('../Models/Notification');

// Initialize GridFS
let gfs;
const conn = mongoose.connection;
conn.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'uploads',
    });
});

const followController = async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).send('Unauthorized');
        }
        const followerId = req.userId; // Get the current user ID from the authenticated request
        const userId = req.params.id; // Get the ID of the user to follow from the request parameters

        // Check if the current user exists
        curUser = await User.findById(followerId);
        // Check if the user to follow exists
        const followUser = await User.findById(userId);
        if (!followUser) {
            return res.status(404).send('User not found');
        }

        // Check if the follow relationship already exists
        const existingFollow = await Follow.findOne({
            userId: userId,
            followerId: followerId,
        });
        if (existingFollow) {
            await Follow.deleteOne({ _id: existingFollow._id });
            followUser.followers_count -= 1;
            await followUser.save();
            curUser.following_count -= 1;
            await curUser.save();
            return res.status(200).send('Unfollowed successfully');
        }

        // Create the follow relationship
        const follow = new Follow({ userId: userId, followerId: followerId });
        await follow.save();

        curUser.following_count += 1;
        await curUser.save();

        followUser.followers_count += 1;
        await followUser.save();

        res.status(201).send('Followed successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const getOtherUserProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        if (userId === req.userId) {
            return res.redirect('/profile');
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        let isFollowing = false;

        const curUser = await User.findById(req.userId);

        if (req.userId) {
            // Check if the current user is already following this user
            const follow = await Follow.findOne({
                userId: userId,
                followerId: req.userId,
            });
            isFollowing = !!follow;
        }

        // Find all followers for the user
        const followers = await Follow.find({ userId: userId }).populate('followerId');

        // Get follower user details
        const followerUsers = await Promise.all(
            followers.map(async (follower) => {
                const followerUser = await User.findById(follower.followerId);
                return followerUser; // Return the entire user object
            }),
        );

        const following = await Follow.find({ followerId: userId }).populate('userId');
        const followingUsers = await Promise.all(
            following.map(async (follow) => {
                const followingUser = await User.findById(follow.userId);
                return followingUser;
            }),
        );

        const post = await Post1.find({ user_id: userId })
            .populate('user_id', 'profile.nick_name profile.display_name profile.avt')
            .sort({ createdAt: -1 });

        const unreadCount = await Notification.countDocuments({
            user_id: req.userId,
            is_read: false,
        });

        res.render('profile', {
            title: user.profile.display_name,
            header: user.profile.nick_name,
            refreshItems: [],
            selectedItem: null,
            user: user,
            username: user.username,
            userid: req.user._id,
            avatarSrc: user.profile.avt ? user.profile.avt : '/Img/UserIcon.jpg',
            followerUsers: followerUsers,
            followingUsers: followingUsers,
            type: 'guest',
            isFollowing: isFollowing, // Pass a boolean indicating if the current user is following this user
            isAuthenticated: !!req.userId,
            curUserId: curUser._id ? curUser._id : null, // Pass a boolean indicating if the user is authenticated
            posts: post,
            unreadCount: unreadCount,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const updateProfileController = async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).send('Unauthorized');
        }
        // Fetch user data from the database using the userId from the JWT token
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Update user profile with form data
        user.profile.display_name = req.body.name;
        user.profile.nick_name = req.body.nickname;
        user.profile.bio = req.body.bio;
        await user.save();

        res.redirect('/profile');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const profileController = async (req, res) => {
    try {
        // Fetch user data from the database using the userId from the JWT token
        if (!req.userId) {
            return res.status(401).send('Unauthorized');
        }
        const userId = req.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Find all followers for the user
        const followers = await Follow.find({ userId: userId }).populate('followerId');

        // Get follower user details
        const followerUsers = await Promise.all(
            followers.map(async (follower) => {
                const followerUser = await User.findById(follower.followerId);
                return followerUser; // Return the entire user object
            }),
        );

        // Find following users
        const following = await Follow.find({ followerId: userId }).populate('userId');
        const followingUsers = await Promise.all(
            following.map(async (follow) => {
                const followingUser = await User.findById(follow.userId);
                return followingUser;
            }),
        );

        const posts = await Post1.find({ user_id: userId })
            .populate('user_id', 'profile.nick_name profile.display_name profile.avt')
            .sort({ createdAt: -1 });

        const unreadCount = await Notification.countDocuments({
            user_id: req.userId,
            is_read: false,
        });

        res.render('profile', {
            title: user.profile.display_name,
            header: 'Personal profile',
            refreshItems: [],
            selectedItem: null,
            user: user,
            username: user.username,
            userid: req.user._id,
            avatarSrc: user.profile.avt,
            followerUsers: followerUsers,
            followingUsers: followingUsers,
            type: 'owner',
            posts: posts,
            curUserId: user._id || null,
            unreadCount: unreadCount,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

//hàm cũ setup cho gfs
const uploadAvatar = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        console.log(req.file);
        // Ensure the file object is defined
        if (!req.file || !req.file.id) {
            return res.status(400).send('File  upload failed');
        }
        // Find the old avatar file ID
        const oldAvatarId = user.profile.avt;

        // Update user's avatar with the file ID
        console.log('ready to update avatar');
        user.profile.avt = req.file.id;
        await user.save();
        console.log('Avatar updated successfully');

        // if (oldAvatarId) {
        //   gfs.delete(new mongoose.Types.ObjectId(oldAvatarId), (err) => {
        //     if (err) {
        //       console.error("Failed to delete old avatar:", err);
        //     } else {
        //       console.log("Old avatar deleted successfully");
        //     }
        //   });
        // }

        res.redirect('/profile');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

//hàm cũ setup cho gfs
const getAvatar = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }

        if (!user.profile.avt) {
            return res.status(404).send('No avatar found');
        }

        const file = await gfs.find({ _id: new mongoose.Types.ObjectId(user.profile.avt) }).toArray();
        if (!file || file.length === 0) {
            return res.status(404).send('No file found');
        }

        gfs.openDownloadStream(new mongoose.Types.ObjectId(user.profile.avt)).pipe(res);
    } catch (error) {
        console.error('Some thing wrong with avatar', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    profileController,
    updateProfileController,
    getOtherUserProfile,
    followController,
    uploadAvatar,
    getAvatar,
};
