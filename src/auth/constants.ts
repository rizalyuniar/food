export const jwtConstants = {
    secret: 'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
};

export const ALLOWED_MIME_IMAGES = ['image/jpeg', 'image/jpeg', 'image/png'];
export const MAX_FILE_IMAGE_SIZE = 5*1024*1024;

export const DOC_TYPE = [
    {
        "type": "foto_makanan",
        "allowed" : ALLOWED_MIME_IMAGES,
        "max_size" : MAX_FILE_IMAGE_SIZE
    },
    // {
    //     "type":"photo_file",
    //     "allowed": ALLOWED_MIME_IMAGES,
    //     "max_size":MAX_FILE_IMAGE_SIZE
    // }
];