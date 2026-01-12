import { type FC, type PropsWithChildren } from "react";
import { observer } from "mobx-react-lite";
import Icon from "@ant-design/icons";

import { useCalculator } from "../../../models/calculatorStore";

import { Map } from "./map";
import { callIcon, mapIcon } from "./icons";

import styles from '../calculator.module.less';

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
  const { phoneNumber, address } = useCalculator();

  const contacts: ContactType[] = [
    { id: 1, title: phoneNumber, icon: callIcon },
    { id: 2, title: address, icon: mapIcon },
  ] as const;

  return (
    <div className={cn.contactList}>
      {contacts.map((contact) => (
        <Contact key={contact.id} icon={contact.icon} style={contact.style}>
          {contact.title}
        </Contact>
      ))}
    </div>
  );
});

const Contacts: FC = () => {
  return (
    <div className={cn.contactsWrap}>
      <div className={styles.calculatorTitle}>Контакты</div>
      <Map />
      <ContactList />
    </div>
  );
};

export { Contacts };
