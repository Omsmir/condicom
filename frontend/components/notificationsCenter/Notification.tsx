import NotificationFilterMenu from "./NotificationFilterMenu";
import NotificationItem from "./NotificationItem";

const Notification = () => {
  return (
    <main className="h-screen flex flex-col max-w-xl w-[567px] border-r">
      <div className="flex px-4 py-5 border-b">
        <h1 className="font-medium text-lg text-slate-700">
          All Notifications
        </h1>
      </div>
      <div className="flex py-6 px-4">
        <NotificationFilterMenu />
      </div>
      <div className="flex flex-col">
        <div className="flex justify-center relative  w-full p-2  text-slate-500 text-sm">
          Today
        </div>
        <div className="flex flex-col">
          <NotificationItem />
        </div>
      </div>
    </main>
  );
};

export default Notification;
