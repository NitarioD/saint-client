"use client";

import axios from "axios";

const getHomeDetails: () => Promise<object> = async () => {
    type data_params = {
        home: {
            header: {
                h1: string,
                p: string
            },
            welcome: {
                h2: string,
                p: string
            },
            support: {
            },
            banner_img: string,
            cards: []
        },
        point_man: {
            title: string,
            content: string
        },
        the_sgf: {
            title: string,
            content: string
        },
        footer_info: {
            about_us: string,
            location: string,
            quick_links: []
        },
        _id: string,
    };
    const { data }: { data: { homeDetails: data_params } } = await axios.get("/base_page/home");
    if (data.homeDetails) {
        return (data.homeDetails);
    }
    return ({
        home: {
            header: {
                h1: "",
                p: ""
            },
            welcome: {
                h2: "",
                p: ""
            },
            support: {
            },
            banner_img: "",
            cards: []
        },
        point_man: {
            title: "",
            content: ""
        },
        the_sgf: {
            title: "",
            content: ""
        },
        footer_info: {
            about_us: "",
            location: "",
            quick_links: []
        },
        _id: "",
    });
};

const getVideos: () => Promise<[]> = async () => {
    const { data } = await axios.get("/videos");

    if (data) {
        return data;
    } else {
        return [];
    }
}

const getArticles: () => Promise<[]> = async () => {
    const { data } = await axios.get("/posts");

    if (data) {
        return data;
    } else {
        return [];
    }
}


const getTeachingPosts: () => Promise<{ _id: string; title: string; content: string; category: string; createdAt: string; updatedAt: string; }[]> = async () => {
    const { data } = await axios.get(`/posts/teaching`);

    if (data.toString()) {
        return (data);
    } else {
        return []
    }
}

const getPublicationPosts: () => Promise<{ _id: string; title: string; content: string; category: string; createdAt: string; updatedAt: string; }[]> = async () => {
    const { data } = await axios.get(`/posts/publication`);

    if (data.toString()) {
        return (data);
    } else {
        return []
    }
}

const getVideoPosts: () => Promise<{ _id: string; title: string; content: string; category: string; createdAt: string; updatedAt: string; }[]> = async () => {
    const { data } = await axios.get(`/videos`);

    if (data.toString()) {
        return (data);
    } else {
        return []
    }
}

const getEvangelismPosts: () => Promise<{ _id: string; title: string; content: string; category: string; createdAt: string; updatedAt: string; }[]> = async () => {
    const { data } = await axios.get(`/posts/evangelism`);

    if (data.toString()) {
        return (data);
    } else {
        return []
    }
}

const isAdmin = async () => {
    const authDetailsInString: string | null = localStorage.getItem("auth");
    if (authDetailsInString) {

        const authDetails = JSON.parse(authDetailsInString);
        const { data } = await axios.get("/is_admin", {
            headers: { Authorization: `Bearer ${authDetails.token}` }
        }
        );
    }

};

export { getHomeDetails, getVideos, getArticles, getTeachingPosts, getPublicationPosts, getVideoPosts, getEvangelismPosts, isAdmin }