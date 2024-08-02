
type submenuItems_params = {
    title: string;
    url: string;
    description?: string;
    icon?: string
};

const submenuItems4Sermons = [
    {
        title: "Teachings",
        url: "/posts/sermons/teachings/1",
        description: "Teachings of spiritual truths by Ayobami Adunola",
        icon: "teachings",
    },
    {
        title: "Videos",
        url: "/posts/sermons/videos",
        description: "watch videos to help ground your spiritual understanding",
        icon: "videos",
    },
    {
        title: "Publications",
        url: "/posts/sermons/publications/1",
        description: "Read our publications",
        icon: "publications",
    },
];

const submenuItems4About = [
    {
        title: "The Point Man",
        url: "/about/the-point-man",
        description: "Get to Know our Prsident, Ayobami Adunola. A servant of God by calling",
        icon: "point_man",
    },
    {
        title: "The SGF",
        url: "/about/the-sgf",
        description: "Find out what we are all about in SGF",
        icon: "sgf",
    },
];


type menuItems_params = {
    label: string;
    url?: string;
    submenuItems?: submenuItems_params[];
};

const navMenu: menuItems_params[] = [
    { label: "Home", url: "/", },
    { label: "Giving", url: "/giving", },
    {
        label: "Sermons",
        submenuItems: submenuItems4Sermons
    },
    { label: "Evangelism Reports", url: "/evangelism-reports/1", },
    {
        label: "About",
        submenuItems: submenuItems4About,
    },
    { label: "Contact", url: "/contact", },
];



export default navMenu;
