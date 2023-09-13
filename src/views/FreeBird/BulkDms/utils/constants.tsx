import { ReactNode } from "react";
import FollowersOFAccount from "../commons/Audience/AudienceComponents/FollowersOFAccount/FollowersOFAccount";
import Giveaway from "../commons/Audience/AudienceComponents/Giveaway/Giveaway";
import ImportCsv from "../commons/Audience/AudienceComponents/ImportCsv/ImportCsv";
import LatestFollowers from "../commons/Audience/AudienceComponents/LatestFollowers/LatestFollowers";
import LeadsList from "../commons/Audience/AudienceComponents/LeadsList/LeadsList";
import ManuallySelect from "../commons/Audience/AudienceComponents/ManuallySelect/ManuallySelect";
import TweetLink from "../commons/Audience/AudienceComponents/TweetLink/TweetLink";
import TweetList from "../commons/Audience/AudienceComponents/TweetList/TweetList";

export const audienceList: {
  title: string;
  id: string;
  component?: ReactNode;
}[] = [
  {
    title: "Followers of an account",
    id: "0",
    component: <FollowersOFAccount />,
  },
  {
    title: "Leads list",
    id: "1",
    component: <LeadsList />,
  },
  {
    title: "Tweet interactions (replay, like)",
    id: "2",
    component: <TweetLink />,
  },
  {
    title: "Tweet List",
    id: "3",
    component: <TweetList />,
  },
  {
    title: "Import from CSV",
    id: "4",
    component: <ImportCsv />,
  },
  {
    title: "Manually select users",
    id: "5",
    component: <ManuallySelect />,
  },
  {
    title: "Your latest followers",
    id: "6",
    component: <LatestFollowers />,
  },
  {
    title: "Giveaway",
    id: "7",
    component: <Giveaway />,
  },
  {
    title: "Search by keyboard",
    id: "8",
  },
];
