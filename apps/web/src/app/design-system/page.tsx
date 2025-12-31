import { Metadata } from 'next';
import {
  colors,
  spacing,
  borderRadius,
  fontSize,
  fontWeight,
  lineHeight,
  boxShadow,
} from '@ourhaus/brand';
import { Card, CardHeader, CardTitle, CardContent } from '@ourhaus/ui/card';

export const metadata: Metadata = {
  title: 'Design System | OurHaus',
  description: 'Design tokens and branding foundation for OurHaus',
};

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen p-4 sm:p-8 bg-background-secondary">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <header className="text-center py-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary-600 mb-4">
            Design System
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Comprehensive design tokens and branding foundation for OurHaus. All
            tokens are available as TypeScript objects and CSS variables.
          </p>
        </header>

        {/* Color Palette */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Color Palette</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Primary Colors */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-text-primary">
                  Primary
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {Object.entries(colors.primary).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <div
                        className="h-16 rounded-lg shadow-sm border border-neutral-200"
                        style={{ backgroundColor: value }}
                      />
                      <div className="text-xs">
                        <div className="font-semibold text-text-primary">
                          {key}
                        </div>
                        <div className="font-mono text-text-tertiary">
                          {value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Secondary Colors */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-text-primary">
                  Secondary
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {Object.entries(colors.secondary).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <div
                        className="h-16 rounded-lg shadow-sm border border-neutral-200"
                        style={{ backgroundColor: value }}
                      />
                      <div className="text-xs">
                        <div className="font-semibold text-text-primary">
                          {key}
                        </div>
                        <div className="font-mono text-text-tertiary">
                          {value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Neutral Colors */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-text-primary">
                  Neutral
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {Object.entries(colors.neutral).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <div
                        className="h-16 rounded-lg shadow-sm border border-neutral-200"
                        style={{ backgroundColor: value }}
                      />
                      <div className="text-xs">
                        <div className="font-semibold text-text-primary">
                          {key}
                        </div>
                        <div className="font-mono text-text-tertiary">
                          {value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Semantic Colors */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-text-primary">
                  Semantic Colors
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {/* Success */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2 text-success-DEFAULT">
                      Success
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(colors.success).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-2">
                          <div
                            className="w-12 h-12 rounded shadow-sm border border-neutral-200"
                            style={{ backgroundColor: value }}
                          />
                          <div className="text-xs">
                            <div className="font-semibold">{key}</div>
                            <div className="font-mono text-text-tertiary">
                              {value}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Warning */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2 text-warning-DEFAULT">
                      Warning
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(colors.warning).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-2">
                          <div
                            className="w-12 h-12 rounded shadow-sm border border-neutral-200"
                            style={{ backgroundColor: value }}
                          />
                          <div className="text-xs">
                            <div className="font-semibold">{key}</div>
                            <div className="font-mono text-text-tertiary">
                              {value}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Error */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2 text-error-DEFAULT">
                      Error
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(colors.error).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-2">
                          <div
                            className="w-12 h-12 rounded shadow-sm border border-neutral-200"
                            style={{ backgroundColor: value }}
                          />
                          <div className="text-xs">
                            <div className="font-semibold">{key}</div>
                            <div className="font-mono text-text-tertiary">
                              {value}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Info */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2 text-info-DEFAULT">
                      Info
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(colors.info).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-2">
                          <div
                            className="w-12 h-12 rounded shadow-sm border border-neutral-200"
                            style={{ backgroundColor: value }}
                          />
                          <div className="text-xs">
                            <div className="font-semibold">{key}</div>
                            <div className="font-mono text-text-tertiary">
                              {value}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Typography Scale */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Typography Scale</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-text-primary">
                  Font Sizes
                </h3>
                <div className="space-y-4">
                  {Object.entries(fontSize).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-baseline gap-4 pb-3 border-b border-neutral-200"
                    >
                      <div className="w-24 text-sm font-mono text-text-tertiary">
                        {key}
                      </div>
                      <div className="w-24 text-xs font-mono text-text-tertiary">
                        {value}
                      </div>
                      <div style={{ fontSize: value }}>
                        The quick brown fox jumps over the lazy dog
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                {/* Font Weights */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-text-primary">
                    Font Weights
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(fontWeight).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center gap-4 text-base"
                      >
                        <div className="w-32 text-sm font-mono text-text-tertiary">
                          {key} ({value})
                        </div>
                        <div style={{ fontWeight: value }}>Sample Text</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Line Heights */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-text-primary">
                    Line Heights
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(lineHeight).map(([key, value]) => (
                      <div key={key} className="space-y-1">
                        <div className="text-sm font-mono text-text-tertiary">
                          {key} ({value})
                        </div>
                        <div
                          className="text-sm bg-neutral-100 p-2 rounded"
                          style={{ lineHeight: value }}
                        >
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Sed do eiusmod tempor incididunt ut labore.
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Spacing Scale */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Spacing Scale</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(spacing).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-4 text-sm">
                    <div className="w-20 font-mono text-text-tertiary">
                      {key}
                    </div>
                    <div className="w-24 font-mono text-text-tertiary text-xs">
                      {value}
                    </div>
                    <div
                      className="h-6 bg-primary-500 rounded"
                      style={{ width: value }}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Border Radius */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Border Radius</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {Object.entries(borderRadius).map(([key, value]) => (
                  <div key={key} className="space-y-3">
                    <div className="text-sm font-semibold text-text-primary">
                      {key}
                    </div>
                    <div className="text-xs font-mono text-text-tertiary mb-2">
                      {value}
                    </div>
                    <div
                      className="w-full h-24 bg-primary-500"
                      style={{ borderRadius: value }}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Elevation / Shadows */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Elevation & Shadows</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.entries(boxShadow).map(([key, value]) => (
                  <div key={key} className="space-y-3">
                    <div className="text-sm font-semibold text-text-primary">
                      {key}
                    </div>
                    <div
                      className="h-32 bg-white rounded-lg flex items-center justify-center text-text-secondary"
                      style={{ boxShadow: value }}
                    >
                      <span className="text-xs font-mono">{key}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CSS Variables Reference */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                CSS Variables Reference
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-text-secondary mb-4">
                All design tokens are available as CSS custom properties. Use
                them in your styles with{' '}
                <code className="bg-neutral-100 px-2 py-1 rounded text-sm font-mono">
                  var(--token-name)
                </code>
                .
              </p>
              <div className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-xs font-mono">
                  {`/* Example usage */
.my-element {
  color: var(--color-primary-600);
  padding: var(--spacing-4);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  font-size: var(--font-size-lg);
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 text-sm text-text-tertiary">
          <p>OurHaus Design System • Token-driven branding foundation</p>
        </footer>
      </div>
    </main>
  );
}
