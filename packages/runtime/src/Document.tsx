import * as React from 'react';
import { useDocumentContext } from './DocumentContext.js';

export function Meta() {
  const { pageConfig = {} } = useDocumentContext();
  const { meta = [] } = pageConfig;

  return (
    <>
      {meta.map(([name, value]) => <meta key={name} name={name} content={value} />)}
    </>
  );
}

export function Title() {
  const { pageConfig = {} } = useDocumentContext();
  const { title = '' } = pageConfig;

  return (
    <title>{title}</title>
  );
}

export function Links() {
  const { pageConfig = {}, pageAssets, entryAssets, publicPath } = useDocumentContext();
  const { links: customLinks = [] } = pageConfig;

  const blockLinks = customLinks.filter((link) => link.block);

  const styles = pageAssets.concat(entryAssets).filter(path => path.indexOf('.css') > -1);

  return (
    <>
      {
        blockLinks.map(link => {
          const { block, ...props } = link;
          return <script key={link.href} {...props} />;
        })
      }
      {styles.map(style => <link key={style} rel="stylesheet" type="text/css" href={`${publicPath}${style}`} />)}
    </>
  );
}

export function Scripts() {
  const { pageConfig = {}, pageAssets, entryAssets, publicPath } = useDocumentContext();
  const { links: customLinks = [], scripts: customScripts = [] } = pageConfig;

  const scripts = pageAssets.concat(entryAssets).filter(path => path.indexOf('.js') > -1);

  const blockScripts = customScripts.filter(script => script.block);
  const deferredScripts = customScripts.filter(script => !script.block);
  const deferredLinks = customLinks.filter(link => !link.block);

  return (
    <>
      {
        blockScripts.map(script => {
          const { block, ...props } = script;
          return <script key={script.src} {...props} />;
        })
      }
      {
        scripts.map(script => {
          return <script key={script} src={`${publicPath}${script}`} />;
        })
      }
      {
        deferredLinks.map(link => {
          const { block, ...props } = link;
          return <script key={link.href} {...props} />;
        })
      }
      {
        deferredScripts.map(script => {
          const { block, ...props } = script;
          return <script key={script.src} deffer="true" {...props} />;
        })
      }
    </>
  );
}

export function Root() {
  const { html } = useDocumentContext();

  // eslint-disable-next-line react/self-closing-comp
  return <div id="root" dangerouslySetInnerHTML={{ __html: html || '' }}></div>;
}
