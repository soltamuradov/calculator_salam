import { type FC, type PropsWithChildren } from "react";
import { observer } from "mobx-react-lite";
import Icon from "@ant-design/icons";
import { Button } from "antd";

import { useCalculator } from "../../../models/calculatorStore";

import { Map } from "./map";
import { callIcon, instagramIcon, mailIcon, mapIcon, whatsappIcon } from "./icons";

import cn from "./contacts.module.less";

type ContactType = {
  id: number;
  title: string;
  icon: () => React.JSX.Element;
  style?: React.CSSProperties
};

const Contact: FC<Partial<ContactType> & PropsWithChildren> = ({ icon, children, style }) => {
  return (
    <div className={cn.contactWrap} style={style}>
      <Icon component={icon} />
      <div>{children}</div>
    </div>
  );
};

const ContactList: FC = observer(() => {
  const { phoneNumber, address, mail, insta } = useCalculator();

  const whatsapp = `https://wa.me/${phoneNumber.replace(/\D/g, "")}`;

  const contacts: ContactType[] = [
    { id: 1, title: phoneNumber, icon: callIcon },
    { id: 2, title: address, icon: mapIcon },
    { id: 3, title: mail, icon: mailIcon },
    { id: 4, title: insta, icon: instagramIcon, style: { margin: "0 0 0 -1px", columnGap: '7px' } },
  ] as const;

  return (
    <div className={cn.contactList}>
      {contacts.map((contact) => (
        <Contact key={contact.id} icon={contact.icon} style={contact.style}>
          {contact.title}
        </Contact>
      ))}
      <Button
        className={cn.contactWriteBtn}
        onClick={() => (location.href = whatsapp)}
        icon={<Icon component={whatsappIcon} />}
      >
        Написать в WhatsApp
      </Button>
    </div>
  );
});

const Contacts: FC = () => {
  return (
    <div className={cn.contactsWrap}>
      <Map />
      <ContactList />
    </div>
  );
};

export { Contacts };
