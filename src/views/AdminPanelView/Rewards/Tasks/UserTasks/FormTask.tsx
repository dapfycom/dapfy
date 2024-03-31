import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import axiosDapfy from "@/services/rest/dapfy-api";
import { IDapfyUserTasks, IUserTasks } from "@/types/rewards.interface";
import { useFormik } from "formik";
import { useEffect } from "react";

interface FormTaskProps {
  xId: string;
  userTasks: IUserTasks;
}

const FormTask = ({ xId, userTasks }: FormTaskProps) => {
  const formik = useFormik({
    initialValues: {
      mention: userTasks?.mention,
      comment: userTasks?.comment,
      like: userTasks?.like,
      rt: userTasks?.rt,
    },
    onSubmit: async (values) => {
      const data: IDapfyUserTasks = {
        user_id: xId,
        comment: values.comment === true ? "true" : "false",
        like: values.like === true ? "true" : "false",
        mention: values.mention === true ? "true" : "false",
        rt: values.rt === true ? "true" : "false",
      };
      await axiosDapfy.post<IDapfyUserTasks>("/task", data);
    },
  });

  useEffect(() => {
    formik.setFieldValue("mention", userTasks?.mention);
    formik.setFieldValue("comment", userTasks?.comment);
    formik.setFieldValue("like", userTasks?.like);
    formik.setFieldValue("rt", userTasks?.rt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userTasks?.user_id]);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="mt-10">
          <h3 className="mb-5">Tasks</h3>
          <div className="flex flex-col gap-3">
            <Task
              completed={Boolean(formik.values.comment)}
              label="Comment"
              {...formik.getFieldProps("comment")}
              setValue={(checked) => formik.setFieldValue("comment", checked)}
            />
            <Task
              completed={Boolean(formik.values?.like)}
              label="like"
              {...formik.getFieldProps("like")}
              setValue={(checked) => formik.setFieldValue("like", checked)}
            />

            <Task
              completed={Boolean(formik.values?.mention)}
              label="mention"
              {...formik.getFieldProps("mention")}
              setValue={(checked) => formik.setFieldValue("mention", checked)}
            />

            <Task
              completed={Boolean(formik.values?.rt)}
              label="rt"
              {...formik.getFieldProps("rt")}
              setValue={(checked) => formik.setFieldValue("rt", checked)}
            />
          </div>
        </div>
        <div className="mt-6">
          <Button>Accept</Button>
        </div>
      </form>
    </div>
  );
};

export default FormTask;

const Task = ({
  label,
  completed,
  ...props
}: {
  label: string;
  completed: boolean;
  name: string;
  setValue: (checked: boolean) => void;
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id={`${props.name}`}
        checked={completed}
        {...props}
        onCheckedChange={props.setValue}
      />
      <Label htmlFor={`${props.name}`}>{label}</Label>
    </div>
  );
};
