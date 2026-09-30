export type ContentMessage =
  | { type: 'ping' }
  | { type: 'clean-selection' }
  | { type: 'paste-cleaned' };
