import { type FC, type PropsWithChildren } from "react";
import { observer } from "mobx-react-lite";
import Icon from "@ant-design/icons";

import { useCalculator } from "../../../models/calculatorStore";

import { Map } from "./map";
import { callIcon, mapIcon } from "./icons";

import styles from "../calculator.module.less";

import cn from "./contacts.module.less";

type ContactType = {
  id: number;
  title: string;
  icon: () => React.JSX.Element;
  style?: React.CSSProperties;
};

const Contact: FC<Partial<ContactType> & PropsWithChildren> = ({ id, icon, children, style }) => {
  let href: string = "";

  if (id === 1) {
    href = `tel:${(children as string).replace(/[^0-9+]/g, "")}`;
  } else {
    href = `https://yandex.ru/maps/-/CLdtm-16`;
  }
  return (
    <a className={cn.contactWrap} style={style} href={href} target="_blank">
      <Icon component={icon} />
      <div>{children}</div>
    </a>
  );
};

const ContactList: FC = observer(() => {
  const { phoneNumber, address } = useCalculator();

  const contacts: ContactType[] = [
    { id: 1, title: phoneNumber, icon: callIcon },
    { id: 2, title: address, icon: mapIcon },
  ] as const;

  return (
    <div className={cn.contactList}>
      {contacts.map((contact) => (
        <Contact id={contact.id} key={contact.id} icon={contact.icon} style={contact.style}>
          {contact.title}
        </Contact>
      ))}
    </div>
  );
});

const Contacts: FC = () => {
  return (
    <div id='contacts' className={cn.contactsWrap}>
      <div className={cn.contactsInfoWrap}>
        <div className={styles.calculatorTitle}>Контакты</div>
        <ContactList />
      </div>
      <Map />
    </div>
  );
};

export { Contacts };
