const path = require('path');
const User = require('../Models/User'); // model user
const Follow = require('../Models/Follow'); // model follow
const jwt = require('jsonwebtoken'); // token
const { default: mongoose } = require('mongoose');
const env = require('dotenv').config(); // biến môi trường
const Post = require('../Models/Post');

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

        const followerId = req.userId;
        const userId = req.params.id;
        const { action } = req.body; // Lấy action từ request body (follow hoặc unfollow)

        const followUser = await User.findById(userId);
        if (!followUser) {
            return res.status(404).send('User not found');
        }

        const existingFollow = await Follow.findOne({
            userId: userId,
            followerId: followerId,
        });

        if (action === 'follow') {
            // Nếu chưa follow thì thực hiện follow
            if (existingFollow) {
                return res.status(400).send('Already following');
            }

            const follow = new Follow({ userId: userId, followerId: followerId });
            await follow.save();

            // Cập nhật số lượng followers và following
            await User.findByIdAndUpdate(followerId, { $inc: { following_count: 1 } });
            await User.findByIdAndUpdate(userId, { $inc: { followers_count: 1 } });

            return res.status(201).send('Followed successfully');
        } else if (action === 'unfollow') {
            // Nếu đã follow thì thực hiện unfollow
            if (!existingFollow) {
                return res.status(400).send('Not following');
            }

            await Follow.deleteOne({ _id: existingFollow._id });

            // Cập nhật số lượng followers và following
            await User.findByIdAndUpdate(followerId, { $inc: { following_count: -1 } });
            await User.findByIdAndUpdate(userId, { $inc: { followers_count: -1 } });

            return res.status(200).send('Unfollowed successfully');
        } else {
            return res.status(400).send('Invalid action');
        }
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

        console.log('ready to render');
        console.log(req.userId);
        res.render('profile', {
            title: user.profile.display_name,
            header: user.profile.nick_name,
            refreshItems: [],
            selectedItem: null,
            user: user,
            username: user.username,
            avatarSrc: user.profile.avt ? user.profile.avt : '/Img/UserIcon.jpg',
            followerUsers: followerUsers,
            followingUsers: followingUsers,
            type: 'guest',
            isFollowing: isFollowing, // Pass a boolean indicating if the current user is following this user
            isAuthenticated: !!req.userId,
            curUserId: curUser._id ? curUser._id : null, // Pass a boolean indicating if the user is authenticated
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

        const posts = await Post.find({ 'user.user_profile_link': `/profile/${userId}` }).sort({ createdAt: -1 });

        res.render('profile', {
            title: user.profile.display_name,
            header: 'Personal profile',
            refreshItems: [],
            selectedItem: null,
            user: user,
            username: user.username,
            avatarSrc: user.profile.avt ? `/profile/avatar/${user._id}` : '/Img/UserIcon.jpg',
            followerUsers: followerUsers,
            followingUsers: followingUsers,
            type: 'owner',
            posts: posts,
            curUserId: user._id || null,
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
