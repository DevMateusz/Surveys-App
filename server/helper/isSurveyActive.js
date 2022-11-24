const isSurveyActive = (survey) => {
  if (survey.expire_at != null && survey.expire_at != '') {
    const today = new Date();
    const expire = new Date(`${survey.expire_at} 00:00:00`);
    if (expire - today > 0 && survey.status) {
      return true;
    }
    return false;
  }
  if (survey.status) {
    return true;
  }
  return false;
}

module.exports = isSurveyActive;