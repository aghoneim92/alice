'use strict';

const worker = new Worker('service-worker.js');

worker.addEventListener('message', ({ data }) => console.log('data:', data));

// worker.postMessage('hi');
