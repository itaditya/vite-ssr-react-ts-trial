import ReactDOM from 'react-dom';
import React from 'react';
import { useClientRouter } from 'vite-plugin-ssr/client/router';
import { PageLayout } from './PageLayout';

function onTransitionStart() {
  console.log('Page transition start');
  // For example:
  document.body.classList.add('page-transition');
}

function onTransitionEnd() {
  console.log('Page transition end');
  // For example:
  document.body.classList.remove('page-transition');
}

const { hydrationPromise } = useClientRouter({
  async render(pageContext) {
    const { Page, pageProps } = pageContext;
    const container = document.getElementById('page-view');

    const page = (
      <PageLayout>
        <Page {...pageProps} />
      </PageLayout>
    );

    if (pageContext.isHydration) {
      ReactDOM.hydrate(page, container);
    } else {
      ReactDOM.render(page, container);
    }

    document.title = pageContext.documentProps?.title || 'Demo';
  },
  onTransitionStart,
  onTransitionEnd,
});

hydrationPromise.then(() => {
  console.log('Hydration finished; page is now interactive.');
});
