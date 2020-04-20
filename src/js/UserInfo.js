export class UserInfo {
    constructor(nameElement, jobElement, userAvatar) {
      this.nameElement = nameElement;
      this.jobElement = jobElement;
      this.userAvatar = userAvatar;
    }
  
    setUserInfo(userData) {
      this.userData = userData;
    }
  
    updateUserInfo() {
      this.nameElement.textContent = this.userData.name;
      this.jobElement.textContent = this.userData.job;
      this.userAvatar.style.backgroundImage = `url(${this.userData.avatar})`;
    }
  }