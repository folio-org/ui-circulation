import { expect } from 'chai';
import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';

import translation from '../../../../translations/ui-circulation/en';
import setupApplication from '../../helpers/setup-application';
import NoticePolicyForm from '../../interactors/notice-policy/notice-policy-form';

describe('NoticePolicyForm', () => {
  setupApplication();

  describe('accordions', () => {
    beforeEach(function () {
      this.visit('/settings/circulation/notice-policies?layer=add');
    });

    it('should be displayed', () => {
      expect(NoticePolicyForm.expandAll.isPresent).to.be.true;
    });

    describe('collapse all', () => {
      beforeEach(async () => {
        await NoticePolicyForm.expandAll.click();
      });

      it('generalSection should not be displayed', () => {
        expect(NoticePolicyForm.generalSectionAccordion.isOpen).to.be.false;
      });

      it('loanNoticesSection should not be displayed', () => {
        expect(NoticePolicyForm.loanNoticesSectionAccordion.isOpen).to.be.false;
      });

      it('requestNoticesSection should not be displayed', () => {
        expect(NoticePolicyForm.requestNoticesSectionAccordion.isOpen).to.be.false;
      });

      describe('expand all', () => {
        beforeEach(async () => {
          await NoticePolicyForm.expandAll.click();
        });

        it('generalSection should be displayed', () => {
          expect(NoticePolicyForm.generalSectionAccordion.isOpen).to.be.true;
        });

        it('loanNoticesSection should be displayed', () => {
          expect(NoticePolicyForm.loanNoticesSectionAccordion.isOpen).to.be.true;
        });

        it('requestNoticesSection should be displayed', () => {
          expect(NoticePolicyForm.requestNoticesSectionAccordion.isOpen).to.be.true;
        });
      });
    });
  });

  describe('create a new notice policy', () => {
    beforeEach(async function () {
      this.visit('/settings/circulation/notice-policies?layer=add');
    });

    describe('general section', () => {
      it('should be displayed', () => {
        expect(NoticePolicyForm.generalSection.isPresent).to.be.true;
      });

      describe('policy name', () => {
        it('should be displayed', () => {
          expect(NoticePolicyForm.generalSection.policyName.isPresent).to.be.true;
        });

        it('should have proper text', () => {
          expect(NoticePolicyForm.generalSection.policyName.text).to.contain(translation['settings.loanPolicy.policyName']);
        });
      });

      describe('active', () => {
        it('should be displayed', () => {
          expect(NoticePolicyForm.generalSection.active.isPresent).to.be.true;
        });

        it('should have proper text', () => {
          expect(NoticePolicyForm.generalSection.active.text).to.equal(
            translation['settings.patronNotices.notice.active']
          );
        });
      });

      describe('policy description', () => {
        it('should be displayed', () => {
          expect(NoticePolicyForm.generalSection.policyDescription.isPresent).to.be.true;
        });

        it('should have proper text', () => {
          expect(NoticePolicyForm.generalSection.policyDescription.text).to.equal(
            translation['settings.loanPolicy.policyDescription']
          );
        });
      });
    });

    describe('loans section', () => {
      it('should be presented', () => {
        expect(NoticePolicyForm.loanNoticesSection.isPresent).to.be.true;
      });

      it('should should have 0 notice cards', () => {
        expect(NoticePolicyForm.loanNoticesSection.hasCards).to.be.false;
      });

      describe('add one card', () => {
        beforeEach(async () => {
          await NoticePolicyForm.loanNoticesSection.addCard();
        });

        it('should have 1 notice cards', () => {
          expect(NoticePolicyForm.loanNoticesSection.hasCards).to.be.true;
        });

        describe('notice card', () => {
          describe('templateId', () => {
            it('should be displayed', () => {
              expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).templateId.hasSelect).to.be.true;
            });

            it('should have proper label', () => {
              expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).templateId.label).to.contain(translation['settings.noticePolicy.notices.template']);
            });
          });

          describe('via text', () => {
            it('should be displayed', () => {
              expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).viaText.isPresent).to.be.true;
            });

            it('should have proper label', () => {
              expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).viaText.text).to.be.equal(
                translation['settings.noticePolicy.notices.via']
              );
            });
          });

          describe('format', () => {
            it('should should be displayed', () => {
              expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).format.hasSelect).to.be.true;
            });

            it('should have proper label', () => {
              expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).format.label).to.contain(translation['settings.noticePolicy.notices.format']);
            });
          });

          describe('triggering event', () => {
            it('should be displayed', () => {
              expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).triggeringEvent.hasSelect).to.be.true;
            });

            it('should have proper label', () => {
              expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).triggeringEvent.label).to.contain(translation['settings.noticePolicy.notices.triggeringEvent']);
            });
          });

          describe('frequency', () => {
            it('should not be displayed', () => {
              expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).frequency.hasSelect).to.be.false;
            });

            describe('-triggering event: Due date', () => {
              beforeEach(async () => {
                await NoticePolicyForm.loanNoticesSection.loanNotices(0).triggeringEvent.selectAndBlur('Loan due date/time');
                await NoticePolicyForm.loanNoticesSection.loanNotices(0).sendHow.selectAndBlur('Before');
              });

              it('should be displayed', () => {
                expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).frequency.hasSelect).to.be.true;
              });

              it('should have proper label', () => {
                expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).frequencyLabel.text).to.contain(translation['settings.noticePolicy.notices.frequency']);
              });
            });
          });

          describe('event label', () => {
            describe('-triggering event: Due date', () => {
              beforeEach(async () => {
                await NoticePolicyForm.loanNoticesSection.loanNotices(0).triggeringEvent.selectAndBlur('Loan due date/time');
              });

              it('should be displayed', () => {
                expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).eventLabel.isPresent).to.be.true;
              });

              it('should have proper text', () => {
                expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).eventLabel.text).to.contain(translation['settings.noticePolicy.notices.send']);
              });
            });

            describe('sendByLabel', () => {
              describe('-triggering event: Due date', () => {
                beforeEach(async () => {
                  await NoticePolicyForm.loanNoticesSection.loanNotices(0).triggeringEvent.selectAndBlur('Loan due date/time');
                });

                describe('-send: Upon At', () => {
                  beforeEach(async () => {
                    await NoticePolicyForm.loanNoticesSection.loanNotices(0).sendHow.selectAndBlur('Upon/At');
                  });

                  it('should not be displayed', () => {
                    expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).sendByLabel.isPresent).to.be.false;
                  });
                });

                describe('-send: Before', () => {
                  beforeEach(async () => {
                    await NoticePolicyForm.loanNoticesSection.loanNotices(0).sendHow.selectAndBlur('Before');
                  });

                  it('should be displayed', () => {
                    expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).sendByLabel.isPresent).to.be.true;
                  });

                  it('should have proper text', () => {
                    expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).sendByLabel.text).to.be.equal(
                      translation['settings.noticePolicy.notices.by']
                    );
                  });
                });

                describe('-send: After', () => {
                  beforeEach(async () => {
                    await NoticePolicyForm.loanNoticesSection.loanNotices(0).sendHow.selectAndBlur('After');
                  });

                  it('should be displayed', () => {
                    expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).sendByLabel.isPresent).to.be.true;
                  });

                  it('should have proper text', () => {
                    expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).sendByLabel.text).to.be.equal(
                      translation['settings.noticePolicy.notices.by']
                    );
                  });
                });
              });
            });

            describe('sendByDuration', () => {
              describe('-triggering event: Due date', () => {
                beforeEach(async () => {
                  await NoticePolicyForm.loanNoticesSection.loanNotices(0).triggeringEvent.selectAndBlur('Loan due date/time');
                });

                describe('-send: Upon At', () => {
                  beforeEach(async () => {
                    await NoticePolicyForm.loanNoticesSection.loanNotices(0).sendHow.selectAndBlur('Upon/At');
                  });

                  it('should not be displayed', () => {
                    expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).sendBy.duration.isPresent).to.be.false;
                  });
                });

                describe('-send: Before', () => {
                  beforeEach(async () => {
                    await NoticePolicyForm.loanNoticesSection.loanNotices(0).sendHow.selectAndBlur('Before');
                  });

                  it('should be displayed', () => {
                    expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).sendBy.duration.isPresent).to.be.true;
                  });
                });

                describe('-send: After', () => {
                  beforeEach(async () => {
                    await NoticePolicyForm.loanNoticesSection.loanNotices(0).sendHow.selectAndBlur('After');
                  });

                  it('should be displayed', () => {
                    expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).sendBy.duration.isPresent).to.be.true;
                  });
                });
              });
            });

            describe('sendByIntervalId', () => {
              describe('-triggering event: Due date', () => {
                beforeEach(async () => {
                  await NoticePolicyForm.loanNoticesSection.loanNotices(0).triggeringEvent.selectAndBlur('Loan due date/time');
                });

                describe('-send: Upon At', () => {
                  beforeEach(async () => {
                    await NoticePolicyForm.loanNoticesSection.loanNotices(0).sendHow.selectAndBlur('Upon/At');
                  });

                  it('should not be displayed', () => {
                    expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).sendBy.interval.isPresent).to.be.false;
                  });
                });

                describe('-send: Before', () => {
                  beforeEach(async () => {
                    await NoticePolicyForm.loanNoticesSection.loanNotices(0).sendHow.selectAndBlur('Before');
                  });

                  it('should be displayed', () => {
                    expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).sendBy.interval.isPresent).to.be.true;
                  });
                });

                describe('-send: After', () => {
                  beforeEach(async () => {
                    await NoticePolicyForm.loanNoticesSection.loanNotices(0).sendHow.selectAndBlur('After');
                  });

                  it('should be displayed', () => {
                    expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).sendBy.interval.isPresent).to.be.true;
                  });
                });
              });
            });

            describe('sendEveryDuration', () => {
              describe('-triggering event: Due date', () => {
                beforeEach(async () => {
                  await NoticePolicyForm.loanNoticesSection.loanNotices(0).triggeringEvent.selectAndBlur('Loan due date/time');
                  await NoticePolicyForm.loanNoticesSection.loanNotices(0).sendHow.selectAndBlur('Before');
                });

                describe('-Frequency: recurring', () => {
                  beforeEach(async () => {
                    await NoticePolicyForm.loanNoticesSection.loanNotices(0).frequency.selectAndBlur('Recurring');
                  });

                  it('should be displayed', () => {
                    expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).sendEvery.duration.isPresent).to.be.true;
                  });
                });

                describe('-Frequency: one time', () => {
                  beforeEach(async () => {
                    await NoticePolicyForm.loanNoticesSection.loanNotices(0).frequency.selectAndBlur('One Time');
                  });

                  it('should not be displayed', () => {
                    expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).sendEvery.duration.isPresent).to.be.false;
                  });
                });
              });
            });

            describe('sendEveryIntervalId', () => {
              describe('-triggering event: Due date', () => {
                beforeEach(async () => {
                  await NoticePolicyForm.loanNoticesSection.loanNotices(0).triggeringEvent.selectAndBlur('Loan due date/time');
                  await NoticePolicyForm.loanNoticesSection.loanNotices(0).sendHow.selectAndBlur('Before');
                });

                describe('-Frequency: recurring', () => {
                  beforeEach(async () => {
                    await NoticePolicyForm.loanNoticesSection.loanNotices(0).frequency.selectAndBlur('Recurring');
                  });

                  it('should be displayed', () => {
                    expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).sendEvery.interval.isPresent).to.be.true;
                  });
                });

                describe('-Frequency: one time', () => {
                  beforeEach(async () => {
                    await NoticePolicyForm.loanNoticesSection.loanNotices(0).frequency.selectAndBlur('One Time');
                  });

                  it('should not be displayed', () => {
                    expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).sendEvery.interval.isPresent).to.be.false;
                  });
                });
              });
            });

            describe('sendEveryLabel', () => {
              describe('-triggering event: Due date', () => {
                beforeEach(async () => {
                  await NoticePolicyForm.loanNoticesSection.loanNotices(0).triggeringEvent.selectAndBlur('Loan due date/time');
                  await NoticePolicyForm.loanNoticesSection.loanNotices(0).sendHow.selectAndBlur('Before');
                });

                describe('-Frequency: recurring', () => {
                  beforeEach(async () => {
                    await NoticePolicyForm.loanNoticesSection.loanNotices(0).frequency.selectAndBlur('Recurring');
                  });

                  it('should be displayed', () => {
                    expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).sendEveryLabel.isPresent).to.be.true;
                  });

                  it('should have proper text', () => {
                    expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).sendEveryLabel.text).to.be.equal(
                      translation['settings.noticePolicy.notices.andEvery']
                    );
                  });
                });

                describe('-Frequency: one time', () => {
                  beforeEach(async () => {
                    await NoticePolicyForm.loanNoticesSection.loanNotices(0).frequency.selectAndBlur('One Time');
                  });

                  it('should not be displayed', () => {
                    expect(NoticePolicyForm.loanNoticesSection.loanNotices(0).sendEveryLabel.isPresent).to.be.false;
                  });
                });
              });
            });
          });
        });
      });
    });

    describe('request section', () => {
      it('should be presented', () => {
        expect(NoticePolicyForm.requestNoticesSection.isPresent).to.be.true;
      });

      it('should should have 0 notice cards', () => {
        expect(NoticePolicyForm.requestNoticesSection.hasCards).to.be.false;
      });

      describe('add one card', () => {
        beforeEach(async () => {
          await NoticePolicyForm.requestNoticesSection.addCard();
        });

        it('should have 1 notice cards', () => {
          expect(NoticePolicyForm.requestNoticesSection.hasCards).to.be.true;
        });

        describe('frequency', () => {
          describe('-triggering event: Request expiration', () => {
            beforeEach(async () => {
              await NoticePolicyForm.requestNoticesSection.requestNotices(0).triggeringEvent.selectAndBlur('Request expiration');
            });

            describe('-send how: Before', () => {
              beforeEach(async () => {
                await NoticePolicyForm.requestNoticesSection.requestNotices(0).sendHow.selectAndBlur('Before');
              });

              it('should be displayed', () => {
                expect(NoticePolicyForm.requestNoticesSection.requestNotices(0).frequency.hasSelect).to.be.true;
              });
            });

            describe('-send how: Upon/At', () => {
              beforeEach(async () => {
                await NoticePolicyForm.requestNoticesSection.requestNotices(0).sendHow.selectAndBlur('Upon/At');
              });

              it('should not be displayed', () => {
                expect(NoticePolicyForm.requestNoticesSection.requestNotices(0).frequency.hasSelect).to.be.false;
              });
            });
          });
        });
      });

      describe('add two cards', () => {
        beforeEach(async () => {
          await NoticePolicyForm.requestNoticesSection.addCard();
          await NoticePolicyForm.requestNoticesSection.addCard();
        });

        it('should have notice cards', () => {
          expect(NoticePolicyForm.requestNoticesSection.hasCards).to.be.true;
        });

        it('should have 2 notice cards', () => {
          expect(NoticePolicyForm.requestNoticesSection.cardsCount).to.be.equal(2);
        });
      });
    });
  });
});
