import { Action, ActionPanel, Form, Image, Toast, showToast, useNavigation } from "@raycast/api";
import View from "./components/View";
import { FormValidation, useForm } from "@raycast/utils";
import { getResendClient } from "./helpers/withResendClient";
import { DomainRegion } from "resend/build/src/domains/interfaces";
import DomainDetail from "./components/DomainDetail";

type DomainFormValues = {
    name: string
    region: string
}

function DomainForm() {
    const { push } = useNavigation()
    const resend = getResendClient()

    const { handleSubmit, itemProps, values, setValue, reset, focus } = useForm<DomainFormValues>({
        async onSubmit(values) {
            const toast = await showToast({ style: Toast.Style.Animated, title: 'Adding domain'})
            try {
                const domain = await resend.domains.create({
                    name: values.name,
                    region: values.region as DomainRegion
                })

                if (domain) {
                    toast.style = Toast.Style.Success
                    toast.title = 'Added domain'

                    push(<DomainDetail initialDomain={domain} />)
                }

                reset({
                    name: '',
                    region: 'us-east-1'
                })

                focus('name')
            } catch (error) {
                console.error(error)
            }
        },
        initialValues: {
            name: '',
            region: 'us-east-1'
        },
        validation: {
            name: FormValidation.Required
        }
    })

    const regions: { value: DomainRegion, title: string}[] = [
        { value: 'eu-west-1', title: 'Ireland' },
        { value: 'sa-east-1', title: 'São Paulo' },
        { value: 'us-east-1', title: 'North Virginia' }
    ]

    return (
        <Form
            actions={
                <ActionPanel>
                    <Action.SubmitForm onSubmit={handleSubmit} title="Add Domain" />
                </ActionPanel>
            }
            enableDrafts
        >
            <Form.TextField {...itemProps.name} title="Domain" placeholder="updates.example.com" />

            <Form.Dropdown {...itemProps.region} title="Region">
                {regions?.map((region) => {
                    return (
                        <Form.Dropdown.Item key={region.value} title={region.title} value={region.value}></Form.Dropdown.Item>
                    )
                })}
            </Form.Dropdown>
        </Form>
    )
}

export default function Command() {
    return (
        <View>
            <DomainForm />
        </View>
    )
}