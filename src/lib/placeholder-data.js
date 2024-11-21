const users = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    name: "User",
    email: "user@sample.com",
    password: "123456",
  },
];

const pages = [
  {
    id: "06f45365-d423-45b5-b88e-dfa7b7d75d91",
    title: "Dashboard",
    cover: "",
    slug: "8f2bb7b0-0a1b-4ec8-a368-6d39efdef4ab",
    userId: "410544b2-4001-4271-9855-fec4b6a6442a",
  },
  {
    id: "251231b9-a064-49a2-a50f-af04b6e6f375",
    title: "Projects",
    cover: "",
    slug: "16ad2b0f-0ae2-4297-b27e-ca1ebc385cc3",
    userId: "410544b2-4001-4271-9855-fec4b6a6442a",
  },
  {
    id: "165308bc-cc1b-417e-bc64-fd38766bf0de",
    title: "Tasks",
    cover: "",
    slug: "f3c97250-0846-495a-9b2b-98119173b497",
    userId: "410544b2-4001-4271-9855-fec4b6a6442a",
  },
  {
    id: "9e6db916-eaed-4f76-9c1d-4eda7123052b",
    title: "Notes",
    cover: "",
    slug: "768abd48-2249-4a26-8c1c-300cd326a207",
    userId: "410544b2-4001-4271-9855-fec4b6a6442a",
  },
];

const notes = [
  {
    id: "5320bdce-d5c9-4258-8abb-ac83c7e9ec87",
    pageId: "06f45365-d423-45b5-b88e-dfa7b7d75d91",
    document: [
      {
        id: "e9015491-21e6-4883-88ae-e717010b194a",
        type: "paragraph",
        props: {
          textColor: "default",
          backgroundColor: "default",
          textAlignment: "left",
        },
        content: [
          {
            type: "text",
            text: "sample paragraph text",
            styles: {},
          },
        ],
        children: [],
      },
      {
        id: "dced6812-7c73-4c83-b580-e6785cf8a817",
        type: "heading",
        props: {
          textColor: "default",
          backgroundColor: "default",
          textAlignment: "left",
          level: 1,
        },
        content: [
          {
            type: "text",
            text: "this is a heading",
            styles: {},
          },
        ],
        children: [],
      },
    ],
  },
  {
    id: "e3bd541f-d09f-46fd-a122-181f48a09884",
    pageId: "251231b9-a064-49a2-a50f-af04b6e6f375",
    document: [],
  },
  {
    id: "4b1fd360-b87e-4629-bb52-ffc47e446798",
    pageId: "165308bc-cc1b-417e-bc64-fd38766bf0de",
    document: [],
  },
  {
    id: "1e804ac2-26b6-4c82-833a-274cd4de849f",
    pageId: "9e6db916-eaed-4f76-9c1d-4eda7123052b",
    document: [],
  },
];

module.exports = {
  pages,
  users,
  notes,
};
