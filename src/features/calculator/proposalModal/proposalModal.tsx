import { action, computed, makeObservable, observable } from "mobx";
import { observer } from "mobx-react-lite";
import { useMemo, type FC } from "react";
import { Button, Checkbox, Form, Input, Modal, type FormInstance } from "antd";

import { InputPhoneNumber } from "../../../elements/inputs/inputPhoneNumber";
import { useCalculator, type CalculatorStore } from "../../../models/calculatorStore";
import { calcService } from "../../../services/calc";

import cn from "./proposalModal.module.less";

const { useForm } = Form;

type FormType = {
  surname: string;
  firstName: string;
  telephone: string;
  confirm: boolean;
};

class Store {
  public surname?: string = "";
  public firstName?: string = "";
  public telephone?: string = "";
  public confirm?: boolean = false;
  public isSent: boolean = false;

  constructor(private calcStore: CalculatorStore, private form: FormInstance) {
    makeObservable(this, {
      surname: observable,
      firstName: observable,
      telephone: observable,
      isSent: observable,
      confirm: observable,
      submitDisabled: computed,
      onChange: action,
      calc: action,
      clear: action,
    });
  }

  public calc = () => {
    const { cost, debtAmount, initialFee, term } = this.calcStore;
    if (!this.surname || !this.firstName || !this.telephone) {
      return;
    }

    return calcService({
      surname: this.surname,
      firstName: this.firstName,
      telephone: this.telephone,
      costPrice: cost,
      debtAmount,
      initialFee,
      term,
    })
      .then(() => {
        this.isSent = true;
        this.form.resetFields();
        return true;
      })
      .catch(() => false);
  };

  public onChange = (values: Partial<FormType>) => {
    const key = Object.keys(values)[0] as keyof FormType;
    if (key === "telephone") {
      if (values[key] === "+7 (___) ___ __ __") {
        this[key] = undefined;
      } else {
        this[key] = values[key];
      }
    } else if (key === "firstName" || key === "surname") {
      this[key] = values[key];
    } else {
      this[key] = values[key];
    }
  };

  public clear = () => {
    this.isSent = false;
    this.surname = undefined;
    this.firstName = undefined;
    this.telephone = undefined;
    this.confirm = undefined;
  };

  public get submitDisabled() {
    const { surname, firstName, telephone, confirm } = this;
    return [!!surname, !!firstName, !!telephone, !!confirm].includes(false);
  }
}

type Props = {
  show: boolean;
  close?: () => void;
  openNotification: (type: "success" | "error") => void;
};

const ProposalModal: FC<Props> = observer(({ show, close, openNotification }) => {
  const calculator = useCalculator();

  const [form] = useForm();

  const store = useMemo(() => new Store(calculator, form), [calculator, form]);

  const handleClose = () => {
    close?.();
    store.clear();
    form.resetFields();
  };

  const calc = () => {
    store
      .calc()
      ?.then(() => {
        openNotification("success");
        handleClose();
      })
      .catch(() => openNotification("error"));
  };

  return (
    <Modal
      className={cn.modal}
      title="Оформить рассрочку"
      open={show}
      onCancel={handleClose}
      width={825}
      footer={false}
    >
      <Form form={form} onValuesChange={(values) => store.onChange(values)} layout="vertical">
        <Form.Item rules={[{ required: true, message: "Обязательное поле" }]} name="surname" label="Фамилия">
          <Input className={cn.input} placeholder="Введите фамилию" />
        </Form.Item>
        <Form.Item rules={[{ required: true, message: "Обязательное поле" }]} name="firstName" label="Имя">
          <Input className={cn.input} placeholder="Введите имя" />
        </Form.Item>
        <Form.Item rules={[{ required: true, message: "Обязательное поле" }]} name="telephone" label="Номер телефона">
          <InputPhoneNumber className={cn.input} />
        </Form.Item>

        <Form.Item name="confirm" valuePropName="checked">
          <Checkbox>
            Фамилия, Имя, Телефон, Нажимая кнопку «Оформить рассрочку», я даю свое согласие на обработку моих
            персональных данных, в соответствии с Федеральным законом от 27.07.2006 года Nº152-Ф3 «О персональных
            данных», на условиях и для целей, определенных в Согласии на обработку персональных данных *
          </Checkbox>
        </Form.Item>
        <Button htmlType="submit" disabled={store.submitDisabled} className={cn.submit} onClick={calc}>
          Оформить рассрочку
        </Button>
      </Form>
    </Modal>
  );
});

export { ProposalModal };
