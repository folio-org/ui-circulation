import { find } from 'lodash';
import replacer from './with-dash-replacer';

export function formatCampusCode(campus, institutions) {
  const targetInstitution = find(institutions.records, { id: campus.institutionId });

  return `${replacer(targetInstitution.code)}>${replacer(campus.code)}`;
}

export function formatCampusDisplayCode(campus, institutions) {
  const targetInstitution = find(institutions.records, { id: campus.institutionId });

  return `${replacer(campus.code)} (${replacer(targetInstitution.code)})`;
}

export function formatLibraryCode(library, institutions, campuses) {
  const targetCampus = find(campuses.records, { id: library.campusId });

  return `${formatCampusCode(targetCampus, institutions)}>${replacer(library.code)}`;
}

export function formatLibraryDisplayCode(library, institutions, campuses) {
  const targetCampus = find(campuses.records, { id: library.campusId });
  const targetInstitution = find(institutions.records, { id: targetCampus.institutionId });

  return `${replacer(library.code)} (${replacer(targetInstitution.code)}-${replacer(targetCampus.code)})`;
}

export function formatLocationCode(location, institutions, campuses, libraries) {
  const targetLibrary = find(libraries.records, { id: location.libraryId });

  return `${formatLibraryCode(targetLibrary, institutions, campuses)}>${replacer(location.code)}`;
}

export function formatLocationDisplayCode(location) {
  return `${replacer(location.code)} (${location.name})`;
}
