import sectionConfigGenerator from './section-config-generator';

export default function (policy) {
  return sectionConfigGenerator(policy, 'requestNotices');
}
