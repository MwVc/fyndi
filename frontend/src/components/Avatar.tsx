const Avatar = ({ avatar }: { avatar: string }) => {
  return (
    <div className="avatar">
      <div className="w-28 rounded-full">
        <img
          alt="profile"
          src={
            avatar &&
            `https://img.daisyui.com/images/profile/demo/gordon@192.webp`
          }
        />
      </div>
    </div>
  );
};

export default Avatar;
