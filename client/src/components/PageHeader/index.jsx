import { PageHeaderContainer } from "./styles";

export function PageHeader({ title, subtitle, ...rest }) {

  return (
    <PageHeaderContainer {...rest}>
      <div>
        <h1>{title}</h1>
      </div>
      <p>{subtitle}</p>
    </PageHeaderContainer>
  );
}
