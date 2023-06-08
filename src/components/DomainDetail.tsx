import { Detail } from "@raycast/api";
import { CreateDomainResponse } from "resend/build/src/domains/interfaces";

interface DomainDetailProps {
    initialDomain: CreateDomainResponse
}

export default function DomainDetail({ initialDomain }: DomainDetailProps) {
    const markdown = `
## DNS Records

\`\`\`
Type:     MX
Name:     bounces
Content:  feedback-smtp.us-east-1.amazonses.com
TTL:      Auto
Priority: 10
Status:   Pending
\`\`\`

\`\`\`
Type:     TXT
Name:     bounces
Content:  "v=spf1 include:amazonses.com ~all"
TTL:      Auto
Status:   Pending
\`\`\`
    `

    return (
        <Detail
            markdown={markdown}
            navigationTitle={initialDomain.name}
            metadata={
                <Detail.Metadata>
                    <Detail.Metadata.Label title="Region" text={initialDomain.region} />

                    <Detail.Metadata.TagList title="Status">
                        <Detail.Metadata.TagList.Item text={initialDomain.status} />
                    </Detail.Metadata.TagList>

                    <Detail.Metadata.Label title="Created" text={initialDomain.created_at} />
                </Detail.Metadata>
            }
        />
    )
}