import dictionary from './dictionary/index'

export default app => {
    [dictionary].forEach(router => {
        router(app);
    });
};
