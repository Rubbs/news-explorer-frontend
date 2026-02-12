import "./Profile.css";

function Profile({ currentUser, onLogout }) {
  return (
    <main className="profile">
      <h1 className="profile__title">Your profile</h1>

      <div className="profile__card">
        <p className="profile__label">Email</p>
        <p className="profile__value">{currentUser?.email}</p>

        <button className="profile__logout" type="button" onClick={onLogout}>
          Log out
        </button>
      </div>
    </main>
  );
}

export default Profile;
