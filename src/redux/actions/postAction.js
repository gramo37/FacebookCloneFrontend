const {
  REQUIRE_POST,
  POST_SUCCESS,
  POST_FAIL,
  REQUIRE_GET_POST,
  GET_POST_SUCCESS,
  GET_POST_FAIL,
  REQUIRE_ADD_COMMENT,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAIL
} = require("../constants/postConstants");
const axios = require("axios");

const host = "https://facebook-clone-react-new.herokuapp.com";

export const sendPost = (caption) => async (dispatch) => {
  try {
    dispatch({
      type: REQUIRE_POST,
    });

    const link = `${host}/api/v1/createPost`;
    const {data} = await axios.post(link, {
      caption: caption,
      image: {
        public_id: "public_id",
        url: "url",
      },
    });

    dispatch({
        type: POST_SUCCESS,
        payload: data
    })

  } catch (error) {
    dispatch({
        type: POST_FAIL,
        payload: error.response.data
    })
  }
};

export const getPost = () => async (dispatch) => {
    try {
        dispatch({
            type: REQUIRE_GET_POST
        })

        const link = `${host}/api/v1/getPosts`;
        const {data} = await axios.get(link);

        dispatch({
            type: GET_POST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_POST_FAIL,
            payload: error.response.data
        })
    }
}

export const addComment = (postId, comment) => async (dispatch) => {
  try {
    dispatch({
      type: REQUIRE_ADD_COMMENT
    })

    const link = `${host}/api/v1/comment/${postId}`
    const {data} = await axios.post(link, {comment: comment});

    dispatch({
      type: ADD_COMMENT_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: ADD_COMMENT_FAIL,
      payload: error.response.data
    });
  }
}
