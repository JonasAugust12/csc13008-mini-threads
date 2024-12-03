const path = require('path');
const User = require('../Models/User'); // model user
const Follow = require('../Models/Follow'); // model follow
const jwt = require('jsonwebtoken'); // token
const env = require('dotenv').config(); // biến môi trường

const followerUsers = [
    {
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        username: 'user1',
        name: 'User 1',
        followers: Math.floor(Math.random() * 10000),
    },
    {
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
        username: 'user2',
        name: 'User 2',
        followers: Math.floor(Math.random() * 10000),
    },
];

const followController = async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).send('Unauthorized');
        }
        const followerId = req.userId; // Get the current user ID from the authenticated request
        const userId = req.params.id; // Get the ID of the user to follow from the request parameters

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
            return res.status(200).send('Unfollowed successfully');
        }

        // Create the follow relationship
        const follow = new Follow({ userId: userId, followerId: followerId });
        await follow.save();

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
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        let isFollowing = false;
        if (req.userId) {
            // Check if the current user is already following this user
            const follow = await Follow.findOne({ userId: userId, followerId: req.userId });
            isFollowing = !!follow;
        }
        console.log('ready to render');
        res.render('profile', {
            title: user.profile.display_name,
            header: user.profile.nick_name,
            refreshItems: [],
            selectedItem: null,
            user: user,
            username: user.username,
            avatarSrc: user.avatar || 'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
            followerUsers: followerUsers,
            type: 'guest',
            isFollowing: isFollowing, // Pass a boolean indicating if the current user is following this user
            isAuthenticated: !!req.userId, // Pass a boolean indicating if the user is authenticated
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
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Example data for followers, replace with actual data from the database

        res.render('profile', {
            title: user.profile.display_name,
            header: 'Personal profile',
            refreshItems: [],
            selectedItem: null,
            user: user,
            username: user.username,
            avatarSrc: user.avatar || 'https://upload.wikimedia.org/wikipedia/en/9/9e/JustinBieberWhatDoYouMeanCover.png',
            followerUsers: followerUsers,
            type: 'owner',
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    profileController,
    updateProfileController,
    getOtherUserProfile,
    followController,
};
