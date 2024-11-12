/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/Public/Pages/**/*.html', './src/Views/**/*.ejs'],
    theme: {
        extend: {
            colors: {
                'mobile-nav': '#101010d9',
                'main-bg': '#0a0a0a',
                'content-bg': '#181818',
                'primary-text': '#f3f5f7', // màu cho phần tên user hay nội dung
                'secondary-text': '#777', // màu cho phần timestamp 1 day hay Picked for you
                'border-color': '#2d2d2d',
            },
            fontFamily: {
                'main-font': ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
            },
            fontSize: {
                'main-size': '15px', // font ở vùng nội dung status
            },
            fontWeight: {
                'content-weight': '400', // font ở vùng nội dung status
                'user-weight': '600', // font ở vùng tên user
            },
        },
    },
    plugins: [],
};
