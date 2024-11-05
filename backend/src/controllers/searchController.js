
const users = [
    { username: '_budu.official', name: 'FAMILY_DUBUDUBU', followers: 4500004, avatar: 'https://i.pinimg.com/736x/4a/99/fc/4a99fc60caf04e2ec45c75c99f2f7615.jpg' },
    { username: 'john_doe', name: 'John Doe', followers: 7653, avatar: 'https://img.freepik.com/premium-photo/graphic-designer-digital-avatar-generative-ai_934475-9292.jpg' },
    { username: 'jane_smith', name: 'Jane Smith', followers: 345789, avatar: 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg' },
];


const searchUsers = (req, res) => {
    const query = req.query.q ? req.query.q.toLowerCase() : '';
    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(query) || user.name.toLowerCase().includes(query)
    );
    const title = "Search";
    res.render('search', { title, query, users: filteredUsers }); 
};

module.exports = {
    searchUsers
};
