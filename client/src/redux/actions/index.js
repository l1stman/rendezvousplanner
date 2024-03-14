export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const DELETE_PROFILE = 'DELETE_PROFILE';

export const updateProfile = (profileData) => ({
  type: UPDATE_PROFILE,
  payload: profileData,
});
export const deleteProfile = () => ({
  type: DELETE_PROFILE,
});
