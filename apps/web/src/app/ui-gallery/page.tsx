import { Metadata } from 'next';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  Textarea,
  Badge,
  Select,
  Checkbox,
  Radio,
  RadioGroup,
  List,
  ListItem,
  EmptyState,
  SummaryBlock,
  SummaryGrid,
  Page,
  PageHeader,
  PageTitle,
  PageContent,
  Section,
  SectionHeader,
  SectionTitle,
  SectionDescription,
} from '@ourhaus/ui';

export const metadata: Metadata = {
  title: 'UI Gallery | OurHaus',
  description:
    'Comprehensive showcase of all UI components in the OurHaus design system',
};

export default function UIGalleryPage() {
  return (
    <Page>
      <PageHeader>
        <PageTitle>UI Component Gallery</PageTitle>
        <p className="text-neutral-600 mt-2">
          A comprehensive showcase of all reusable components in the OurHaus
          design system. All components are mobile-first, accessible, and built
          with design tokens.
        </p>
      </PageHeader>

      <PageContent maxWidth="2xl">
        <div className="space-y-12">
          {/* Primitive Components */}
          <Section>
            <SectionHeader>
              <SectionTitle>Primitive Components</SectionTitle>
              <SectionDescription>
                Basic building blocks for forms, navigation, and UI elements
              </SectionDescription>
            </SectionHeader>

            {/* Buttons */}
            <Card>
              <CardHeader>
                <CardTitle>Button</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-neutral-700 mb-3">
                    Variants
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-neutral-700 mb-3">
                    Sizes
                  </h4>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-neutral-700 mb-3">
                    States
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    <Button isLoading>Loading</Button>
                    <Button disabled>Disabled</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Inputs */}
            <Card>
              <CardHeader>
                <CardTitle>Input</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Email"
                    type="email"
                    placeholder="you@example.com"
                    helperText="We'll never share your email"
                    fullWidth
                  />
                  <Input
                    label="Password"
                    type="password"
                    placeholder="Enter password"
                    fullWidth
                  />
                </div>
                <Input
                  label="Name with Error"
                  type="text"
                  error="This field is required"
                  fullWidth
                />
                <Textarea
                  label="Description"
                  placeholder="Enter a description..."
                  rows={4}
                  helperText="Maximum 500 characters"
                  fullWidth
                />
              </CardContent>
            </Card>

            {/* Select */}
            <Card>
              <CardHeader>
                <CardTitle>Select</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Select
                    label="Country"
                    helperText="Select your country"
                    fullWidth
                  >
                    <option value="">Choose a country</option>
                    <option value="us">United States</option>
                    <option value="ca">Canada</option>
                    <option value="uk">United Kingdom</option>
                    <option value="au">Australia</option>
                  </Select>
                  <Select
                    label="Priority"
                    error="Please select a priority"
                    fullWidth
                  >
                    <option value="">Select priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Badges */}
            <Card>
              <CardHeader>
                <CardTitle>Badge</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-neutral-700 mb-3">
                    Variants
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="primary">Primary</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="error">Error</Badge>
                    <Badge variant="info">Info</Badge>
                    <Badge variant="neutral">Neutral</Badge>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-neutral-700 mb-3">
                    Sizes
                  </h4>
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge size="sm">Small</Badge>
                    <Badge size="md">Medium</Badge>
                    <Badge size="lg">Large</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Checkbox & Radio */}
            <Card>
              <CardHeader>
                <CardTitle>Checkbox & Radio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-700 mb-3">
                      Checkboxes
                    </h4>
                    <div className="space-y-4">
                      <Checkbox
                        label="Accept terms and conditions"
                        helperText="You must accept to continue"
                      />
                      <Checkbox
                        label="Subscribe to newsletter"
                        defaultChecked
                      />
                      <Checkbox
                        label="With Error"
                        error="This field is required"
                      />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-neutral-700 mb-3">
                      Radio Buttons
                    </h4>
                    <RadioGroup label="Choose a plan">
                      <Radio
                        name="plan"
                        value="free"
                        label="Free"
                        helperText="For personal use"
                      />
                      <Radio
                        name="plan"
                        value="pro"
                        label="Pro"
                        helperText="For professionals"
                        defaultChecked
                      />
                      <Radio
                        name="plan"
                        value="enterprise"
                        label="Enterprise"
                        helperText="For teams"
                      />
                    </RadioGroup>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card */}
            <Card>
              <CardHeader>
                <CardTitle>Card</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card variant="elevated" padding="md">
                    <CardTitle>Elevated</CardTitle>
                    <CardContent>Card with shadow elevation</CardContent>
                  </Card>
                  <Card variant="outlined" padding="md">
                    <CardTitle>Outlined</CardTitle>
                    <CardContent>Card with border outline</CardContent>
                  </Card>
                  <Card variant="flat" padding="md">
                    <CardTitle>Flat</CardTitle>
                    <CardContent>Card with no shadow</CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </Section>

          {/* Block Components */}
          <Section>
            <SectionHeader>
              <SectionTitle>Block Components</SectionTitle>
              <SectionDescription>
                Reusable blocks for displaying structured content
              </SectionDescription>
            </SectionHeader>

            {/* Lists */}
            <Card>
              <CardHeader>
                <CardTitle>List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-700 mb-3">
                      Default
                    </h4>
                    <List variant="default">
                      <ListItem variant="default">List item 1</ListItem>
                      <ListItem variant="default">List item 2</ListItem>
                      <ListItem variant="default">List item 3</ListItem>
                    </List>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-neutral-700 mb-3">
                      Bordered
                    </h4>
                    <List variant="bordered">
                      <ListItem variant="bordered">List item 1</ListItem>
                      <ListItem variant="bordered">List item 2</ListItem>
                      <ListItem variant="bordered">List item 3</ListItem>
                    </List>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-neutral-700 mb-3">
                      Divided
                    </h4>
                    <List variant="divided">
                      <ListItem variant="divided">List item 1</ListItem>
                      <ListItem variant="divided">List item 2</ListItem>
                      <ListItem variant="divided">List item 3</ListItem>
                    </List>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Empty State */}
            <Card>
              <CardHeader>
                <CardTitle>Empty State</CardTitle>
              </CardHeader>
              <CardContent>
                <EmptyState
                  title="No items found"
                  description="There are no items to display. Get started by creating your first item."
                  icon={
                    <svg
                      className="w-16 h-16"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                  }
                  action={<Button>Create Item</Button>}
                />
              </CardContent>
            </Card>

            {/* Summary Blocks */}
            <Card>
              <CardHeader>
                <CardTitle>Summary Block</CardTitle>
              </CardHeader>
              <CardContent>
                <SummaryGrid columns={3}>
                  <SummaryBlock
                    label="Total Revenue"
                    value="$45,231"
                    change={{ value: '+20.1%', trend: 'up' }}
                    variant="primary"
                  />
                  <SummaryBlock
                    label="Active Users"
                    value="2,456"
                    change={{ value: '+12%', trend: 'up' }}
                    variant="success"
                  />
                  <SummaryBlock
                    label="Conversion Rate"
                    value="3.2%"
                    change={{ value: '-2.4%', trend: 'down' }}
                    variant="warning"
                  />
                </SummaryGrid>
              </CardContent>
            </Card>
          </Section>

          {/* Layout Components */}
          <Section>
            <SectionHeader>
              <SectionTitle>Layout Components</SectionTitle>
              <SectionDescription>
                Structural components for consistent page layouts
              </SectionDescription>
            </SectionHeader>

            <Card>
              <CardHeader>
                <CardTitle>Layout Components Demo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-neutral-300 rounded-lg p-4">
                  <p className="text-sm text-neutral-600 mb-2">
                    <strong>Page:</strong> Wrapper for full page layouts with
                    background
                  </p>
                  <p className="text-sm text-neutral-600 mb-2">
                    <strong>PageHeader:</strong> Consistent header with title
                    and description
                  </p>
                  <p className="text-sm text-neutral-600 mb-2">
                    <strong>PageContent:</strong> Content area with max-width
                    and responsive padding
                  </p>
                  <p className="text-sm text-neutral-600 mb-2">
                    <strong>Section:</strong> Content sections with spacing
                  </p>
                  <p className="text-sm text-neutral-600 mb-2">
                    <strong>AppShell:</strong> Main app layout with header,
                    content, and footer
                  </p>
                </div>

                <div className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-xs font-mono">
                    {`<Page>
  <PageHeader>
    <PageTitle>Page Title</PageTitle>
  </PageHeader>
  <PageContent maxWidth="xl">
    <Section>
      <SectionHeader>
        <SectionTitle>Section Title</SectionTitle>
        <SectionDescription>Description</SectionDescription>
      </SectionHeader>
      {/* Content */}
    </Section>
  </PageContent>
</Page>`}
                  </pre>
                </div>

                <div className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-xs font-mono">
                    {`<AppShell
  header={
    <AppHeader>
      <AppNav>Navigation</AppNav>
    </AppHeader>
  }
  footer={
    <AppFooter>Footer content</AppFooter>
  }
>
  {/* Main content */}
</AppShell>`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </Section>

          {/* Mobile-First & Accessibility */}
          <Section>
            <SectionHeader>
              <SectionTitle>Design Principles</SectionTitle>
              <SectionDescription>
                Key principles followed by all components
              </SectionDescription>
            </SectionHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card variant="outlined">
                <CardHeader>
                  <CardTitle>Mobile-First</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-neutral-700">
                    <li>✓ Touch targets ≥ 44px</li>
                    <li>✓ Responsive layouts</li>
                    <li>✓ Mobile-optimized spacing</li>
                    <li>✓ Fluid typography</li>
                  </ul>
                </CardContent>
              </Card>

              <Card variant="outlined">
                <CardHeader>
                  <CardTitle>Accessibility</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-neutral-700">
                    <li>✓ Keyboard navigation</li>
                    <li>✓ Screen reader support (ARIA)</li>
                    <li>✓ Focus indicators</li>
                    <li>✓ Semantic HTML</li>
                  </ul>
                </CardContent>
              </Card>

              <Card variant="outlined">
                <CardHeader>
                  <CardTitle>Token-Driven</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-neutral-700">
                    <li>✓ Design tokens from @ourhaus/brand</li>
                    <li>✓ Consistent spacing scale</li>
                    <li>✓ Unified color palette</li>
                    <li>✓ Typography system</li>
                  </ul>
                </CardContent>
              </Card>

              <Card variant="outlined">
                <CardHeader>
                  <CardTitle>Composable</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-neutral-700">
                    <li>✓ Small, focused components</li>
                    <li>✓ Flexible composition</li>
                    <li>✓ Reusable across features</li>
                    <li>✓ TypeScript types included</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </Section>
        </div>
      </PageContent>
    </Page>
  );
}
