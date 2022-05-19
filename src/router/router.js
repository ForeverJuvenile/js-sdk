
function updateDocumentTitle(to) {
    if (to.query.title)   to.meta.title = to.query.title;
    return true;
}

const routes = [
    /**demo */
    {
        path: '/',
        name: 'Home',
        meta: {
            title: '微信公众号',
            desc: '微信JS-SDK是微信公众平台 面向网页开发者提供的基于微信内的网页开发工具包。通过使用微信JS-SDK，网页开发者可借助微信高效地使用拍照、选图、语音、位置等手机系统的能力，同时可以直接使用微信分享、扫一扫、卡券、支付等微信特有的能力，为微信用户提供更优质的网页体验'
        },
        beforeEnter: [updateDocumentTitle],
        component: () => import(/* webpackChunkName: "Home" */ '@pages/home/index'),
    },
    {
        path: '/appendix',
        name: 'Appendix',
        meta: {
            title: '微信公众号',
            desc: '微信JS-SDK是微信公众平台 面向网页开发者提供的基于微信内的网页开发工具包。通过使用微信JS-SDK，网页开发者可借助微信高效地使用拍照、选图、语音、位置等手机系统的能力，同时可以直接使用微信分享、扫一扫、卡券、支付等微信特有的能力，为微信用户提供更优质的网页体验'
        },
        beforeEnter: [updateDocumentTitle],
        component: () => import(/* webpackChunkName: "Appendix" */ '@pages/appendix/index'),
    },
    {
        path: '/open-launch',
        name: 'OpenLaunch',
        meta: {
            title: '微信开放标签',
            desc: '微信JS-SDK是微信公众平台 面向网页开发者提供的基于微信内的网页开发工具包。通过使用微信JS-SDK，网页开发者可借助微信高效地使用拍照、选图、语音、位置等手机系统的能力，同时可以直接使用微信分享、扫一扫、卡券、支付等微信特有的能力，为微信用户提供更优质的网页体验'
        },
        beforeEnter: [updateDocumentTitle],
        component: () => import(/* webpackChunkName: "OpenLaunch" */ '@pages/open-launch/index'),
    },
    {
        path: '/record',
        name: 'Record',
        meta: {
            title: '微信开放标签',
            desc: '微信JS-SDK是微信公众平台 面向网页开发者提供的基于微信内的网页开发工具包。通过使用微信JS-SDK，网页开发者可借助微信高效地使用拍照、选图、语音、位置等手机系统的能力，同时可以直接使用微信分享、扫一扫、卡券、支付等微信特有的能力，为微信用户提供更优质的网页体验'
        },
        beforeEnter: [updateDocumentTitle],
        component: () => import(/* webpackChunkName: "record" */ '@pages/record/index'),
    },
    {
        path: '/smart',
        name: 'Smart',
        meta: {
            title: '微信开放标签',
            desc: '微信JS-SDK是微信公众平台 面向网页开发者提供的基于微信内的网页开发工具包。通过使用微信JS-SDK，网页开发者可借助微信高效地使用拍照、选图、语音、位置等手机系统的能力，同时可以直接使用微信分享、扫一扫、卡券、支付等微信特有的能力，为微信用户提供更优质的网页体验'
        },
        beforeEnter: [updateDocumentTitle],
        component: () => import(/* webpackChunkName: "smart" */ '@pages/smart/index'),
    },
    { 
        path: '/:pathMatch(.*)*', 
        meta: {
            title: '微信开放标签',
            desc: '微信JS-SDK是微信公众平台 面向网页开发者提供的基于微信内的网页开发工具包。通过使用微信JS-SDK，网页开发者可借助微信高效地使用拍照、选图、语音、位置等手机系统的能力，同时可以直接使用微信分享、扫一扫、卡券、支付等微信特有的能力，为微信用户提供更优质的网页体验'
        },
        beforeEnter: [  updateDocumentTitle],
        redirect: '/' 
    },
];

export default routes;
