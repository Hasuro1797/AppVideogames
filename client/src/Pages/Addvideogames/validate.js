export function validate(input,cb) {
    let errors = {};
    if (!input.name) {
        errors.name = 'Title of game is required';
    } else if (!/^[a-zA-Z0-9]/.test(input.name)) {
        errors.name = 'Title is invalid';
    }
    if (!input.description) {
        errors.description = 'The description is required';
    } else if (!/^[a-zA-Z0-9]/.test(input.description)) {
        errors.description = 'The description is invalid';
    }
    if (!input.rating) {
        errors.rating = 'The rating is required';
    } else if (!/^\d*(\.\d{0,2})?$/.test(input.rating) || input.rating>5) {
        errors.rating = 'The rating is invalid';
    }
    if (!input.released) {
        errors.released = 'The released is required';
    }
    if (!input.background_image) {
        errors.background_image = 'Image link is required';
        cb(false)
    } else if (!/^(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))$/.test(input.background_image) && (!/^https?:\/\/[\w]+(\.[\w]+)+[/#?]?.*$/.test(input.background_image))) {
        errors.background_image = 'The link is invalid';
        cb(false)
    } else if(/^(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))$/.test(input.background_image)){
        cb(true);
    }
    return errors;
};